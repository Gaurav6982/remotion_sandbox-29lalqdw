import {
    AbsoluteFill,
    Img,
    useVideoConfig,
    useCurrentFrame,
    spring,
    interpolate,
} from 'remotion';
import React from 'react';

type SplitImageBulletPointsSceneProps = {
    imageUrl: string;
    heading: string;
    bulletPoints: string[];
    audioDurationInSeconds: number;
    exitDurationInSeconds: number; // ⬅️ new prop
};

export const SplitImageBulletPointsScene: React.FC<SplitImageBulletPointsSceneProps> = ({
                                                                                            imageUrl,
                                                                                            heading,
                                                                                            bulletPoints,
                                                                                            audioDurationInSeconds,
                                                                                            exitDurationInSeconds,
                                                                                        }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const totalDuration = Math.floor(audioDurationInSeconds * fps);
    const exitStart = totalDuration - Math.floor(exitDurationInSeconds * fps);

    // Entry Animation
    const enterProgress = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        config: { damping: 200 },
    });

    // Exit Animation
    const exitProgress = interpolate(
        frame,
        [exitStart, totalDuration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Combine both
    const translateY = interpolate(
        exitProgress,
        [0, 1],
        [0, 100]
    );

    const finalTranslateY = interpolate(
        enterProgress,
        [0, 1],
        [100, 0]
    ) + translateY;

    const opacity = interpolate(
        exitProgress,
        [0, 1],
        [1, 0]
    );

    return (
        <AbsoluteFill style={{ flexDirection: 'row', fontFamily: 'sans-serif' }}>
            {/* Left - Image */}
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Img src={imageUrl} style={{ maxWidth: '90%', maxHeight: '90%' }} />
            </div>

            {/* Right - Text */}
            <div
                style={{
                    width: '50%',
                    padding: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transform: `translateY(${finalTranslateY}px)`,
                    opacity,
                    backgroundImage: 'url(https://i.ibb.co/67M3V35N/88679.jpg)',

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h1 style={{ fontSize: 64, marginBottom: 40, color: '#111' }}>{heading}</h1>
                <ul style={{ fontSize: 36, color: '#333', paddingLeft: 20 }}>
                    {bulletPoints.map((point, i) => (
                        <li key={i} style={{ marginBottom: 20 }}>{point}</li>
                    ))}
                </ul>
            </div>
        </AbsoluteFill>
    );
};
