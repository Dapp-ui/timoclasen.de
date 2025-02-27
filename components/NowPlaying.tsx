import Image from 'next/image';
import useSWR from 'swr';

import type { NowPlayingData } from '../pages/api/now-playing';
import { Skeleton } from './Skeleton';
import { SoundBars } from './SoundBars';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET ?? '';

const fetchObj = {
  headers: {
    'api-secret': apiSecret,
  },
};

export function NowPlaying() {
  const { data, error } = useSWR<NowPlayingData>([
    '/api/now-playing',
    fetchObj,
  ]);

  if (error) {
    return <div>Fehler beim Laden…</div>;
  }

  return (
    <section className="flex justify-center">
      <div className="w-full space-y-2 rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 sm:w-auto sm:min-w-[450px] xl:px-12 xl:py-12">
        <div className="flex space-x-6">
          {data && data.image ? (
            <div className="flex-none">
              <Image
                className="rounded-2xl"
                src={data.image}
                quality={60}
                alt={data.albumName}
                layout="fixed"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <Skeleton width="100px" height="100px" borderRadius="1rem" />
          )}
          <div className="overflow-hidden">
            <a href={data?.url} target="_blank" rel="noopener noreferrer">
              <h2
                className="text-md mb-2 truncate font-bold hover:text-[#116E32] dark:hover:text-[#1DB954] md:text-xl lg:text-2xl"
                title={data?.name}
              >
                {data ? data.name : <Skeleton width="300px" />}
              </h2>
            </a>
            <p
              className="text-md mb-0.5 truncate opacity-60 md:text-lg lg:text-xl"
              title={data?.artistName}
            >
              {data ? data.artistName : <Skeleton width="200px" />}
            </p>
            <p
              className="text-md truncate opacity-60 md:text-lg lg:text-xl"
              title={data?.albumName}
            >
              {data ? data.albumName : <Skeleton width="200px" />}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-[#116E32] dark:text-[#1DB954]">
          {data ? (
            <>
              <SoundBars
                isPlaying={data?.isPlaying}
                color="bg-[#116E32] dark:bg-[#1DB954]"
              />
              <p className="text-center text-base">
                {data?.isPlaying ? 'Läuft gerade auf ' : 'Zuletzt gehört auf '}
                <a
                  href="https://www.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>
              </p>
            </>
          ) : (
            <Skeleton width="160px" height="16px" />
          )}
        </div>
      </div>
    </section>
  );
}
