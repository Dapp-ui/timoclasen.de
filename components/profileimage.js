import Image from 'next/image';

export default function ProfileImage({ url, alt }) {
    return (
        <div
            className={
                'flex justify-center border-b-4 border-highlight dark:border-highlight-dark'
            }>
            <Image
                src={`https:${url}`}
                width={400}
                height={500}
                alt={alt}
                quality={90}
                priority
            />
        </div>
    );
}
