import {Composition} from 'remotion';
import {CombinedScene} from './CombineScenes';

export const RemotionVideo = () => {
    return (
        <>
            <Composition
                id="CombinedScene"
                component={CombinedScene}
                durationInFrames={300} // scene1 + scene2 = 2 * (audioDurationInSeconds * fps)
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    imageUrl: 'https://via.placeholder.com/600x800',
                    title: 'Welcome to Our Service',
                    heading: 'Why Choose Us',
                    bulletPoints: [
                        'Fast rendering engine',
                        'Modular and composable scenes',
                        'Supports audio sync',
                        'Open-source and free',
                    ],
                    audioDurationInSeconds: 5,
                }}
            />
        </>
    );
};
