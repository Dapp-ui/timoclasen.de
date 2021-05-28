import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import readingTime from 'reading-time';

import BlogPostHeader from '../../components/BlogPostHeader';
import ContactWidget from '../../components/ContactWidget';
import Layout from '../../components/Layout';
import SEOBlogPost from '../../components/SEOBlogPost';
import TextBlock from '../../components/TextBlock';
import TextPost from '../../components/TextPost';
import { queryContent } from '../../lib/content';
import { markdownToHTML } from '../../lib/text';
import { BlogPost as BlogPostType } from '../blog';

interface Props {
    preview: boolean;
    blogPost: BlogPostType;
    loading: string;
    error: string;
    contact: string;
}

export default function BlogPost(props: Props) {
    const router = useRouter();

    if (!router.isFallback && !props.blogPost) {
        return (
            <Layout title="Error 404" description="Error 404">
                <TextBlock text={props.error} />
                <ContactWidget text={props.contact} />
            </Layout>
        );
    }

    if (router.isFallback && !props.blogPost) {
        return (
            <Layout title="Seite lädt…" description="Seite lädt…">
                <TextBlock text={props.loading} />
                <ContactWidget text={props.contact} />
            </Layout>
        );
    }

    const date = new Date(props.blogPost.date).toISOString();

    return (
        <Layout
            preview={props.preview}
            title={props.blogPost.title}
            description={props.blogPost.summary}
            previewImage={props.blogPost.previewImage}
            slug={`blog/${props.blogPost.slug}`}>
            <SEOBlogPost
                authorName={props.blogPost.author.name}
                readingTime={props.blogPost.readingTime}
                date={date}
                slug={props.blogPost.slug}
                title={props.blogPost.title}
                description={props.blogPost.summary}
                previewImage={props.blogPost.previewImage}
            />
            <article className="space-y-8 md:space-y-16">
                <BlogPostHeader
                    title={props.blogPost.title}
                    subtitle={props.blogPost.subtitle}
                    date={props.blogPost.dateFormatted}
                    author={props.blogPost.author}
                    readingTime={props.blogPost.readingTime}
                    sys={props.blogPost.sys}
                />
                <TextPost>{props.blogPost.text}</TextPost>
            </article>
            <ContactWidget text={props.contact} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false
}) => {
    const response = await queryContent(
        `{
            blogPost: blogPostCollection(where: {slug: "${params?.slug}"}, limit: 1, preview: false) {
                items {
                    sys {
                        publishedVersion
                    }
                    title
                    subtitle
                    slug
                    previewImage {
                        url
                        description
                    }
                    date
                    author {
                        name
                        username
                        image {
                            url
                            description
                        }
                    }
                    summary
                    text
                }
            }
            errorSnippet: textSnippetCollection(where: {title: "Error 404"}, limit: 1, preview: false) {
                items {
                    content
                }
            }
            contactSnippet: textSnippetCollection(where: {title: "Contact Widget"}, limit: 1) {
                items {
                    content
                }
            }
        }`,
        preview
    );

    const blogPost = response.data.blogPost.items[0];

    const readingTimeObj = readingTime(blogPost.text);
    blogPost.readingTime = Math.ceil(readingTimeObj.minutes);

    blogPost.dateFormatted = format(parseISO(blogPost.date), 'dd. MMMM yyyy', {
        locale: de
    });

    const errorText = response.data.errorSnippet.items[0].content;
    const contactText = response.data.contactSnippet.items[0].content;

    return {
        props: {
            preview,
            blogPost,
            error: await markdownToHTML(errorText),
            loading: await markdownToHTML('# Seite lädt…'),
            contact: await markdownToHTML(contactText)
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await queryContent(
        `{
            blogPosts: blogPostCollection(preview: false) {
                items {
                    slug
                }
            }
        }`
    );

    const blogPosts = response.data.blogPosts.items;

    return {
        paths: blogPosts.map((blogPost: { slug: string }) => {
            return {
                params: {
                    slug: blogPost.slug
                }
            };
        }),
        fallback: true
    };
};
