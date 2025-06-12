import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';

type SplitImageTitleSceneProps = {
    imageUrl: string;
    title: string;
    audioDurationInSeconds: number;
};

export const SplitImageTitleScene: React.FC<SplitImageTitleSceneProps> = ({
                                                                              imageUrl,
                                                                              title,
                                                                              audioDurationInSeconds,
                                                                          }) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    // Optional: add a spring animation for the title entrance
    const titleTranslate = spring({
        frame,
        fps,
        from: 100,
        to: 0,
        config: {
            damping: 200,
        },
    });

    return (
        <AbsoluteFill style={{flexDirection: 'row', fontFamily: 'sans-serif'}}>
            {/* Left half - Image */}
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
                <Img src={imageUrl} style={{maxWidth: '90%', maxHeight: '90%'}} />
            </div>

            {/* Right half - Title */}
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 40,
                }}
            >
                <h1
                    style={{
                        fontSize: 80,
                        color: '#111',
                        transform: `translateY(${titleTranslate}px)`,
                        opacity: interpolate(titleTranslate, [0, 100], [1, 0]),
                        textAlign: 'center',
                    }}
                >
                    {title}
                </h1>
            </div>
        </AbsoluteFill>
    );
};
