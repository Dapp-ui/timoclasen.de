import useSWR from 'swr';

import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetRunning from '@/components/WidgetRunning';
import fetcher from '@/lib/fetcher';

export default function RunningWidget() {
    const { data, error } = useSWR('/api/running', fetcher);

    const darkMode =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <WidgetLayout
            FirstWidget={
                <WidgetRunning
                    thisYear={error ? error : data?.thisYear}
                    lastRun={error ? error : data?.lastRun}
                />
            }
            SecondWidget={
                data && (
                    <WidgetImage
                        url={
                            darkMode
                                ? data.lastRun.map.dark
                                : data.lastRun.map.light
                        }
                        description="Kartenansicht des letzten Laufes von Timo"
                    />
                )
            }
            separate
        />
    );
}
