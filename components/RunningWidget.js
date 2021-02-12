import { useContext } from 'react';
import useSWR from 'swr';

import { ThemeContext } from '@/components/ThemeContext';
import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetRunning from '@/components/WidgetRunning';
import fetcher from '@/lib/fetcher';

export default function RunningWidget() {
    const { data, error } = useSWR('/api/running', fetcher);

    if (error) {
        return <div>Fehler beim Laden…</div>;
    }

    const { darkMode } = useContext(ThemeContext);

    console.log(data?.lastRun?.map?.dark?.length);
    console.log(data?.lastRun?.map?.dark);

    return (
        <div id="running">
            <WidgetLayout
                FirstWidget={
                    <WidgetRunning
                        thisYear={data?.thisYear}
                        lastRun={data?.lastRun}
                    />
                }
                SecondWidget={
                    <WidgetImage
                        url={
                            darkMode
                                ? data?.lastRun?.map?.dark
                                : data?.lastRun?.map?.light
                        }
                        description="Kartenansicht des letzten Laufes von Timo"
                    />
                }
                separate
            />
        </div>
    );
}
