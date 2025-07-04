import {AbsoluteFill, Sequence} from 'remotion';
import React from 'react';
import {SplitImageTitleScene} from './SplitImageTitleScene';
// import {SplitImageBulletPointsScene} from './SplitImageBulletPointsScene';
// import {PortraitIntroScene} from "./PortraitIntroScene";
// import {SplitImageBulletPointsHorizontalScene} from "./SplitImageBulletPointsHorizontalScene";
import {SplitImageBulletPointsScene} from "./SplitImageBulletPointsScene";

type CombinedSceneProps = {
    imageUrl: string;
    title: string;
    bulletPoints: string[];
    heading: string;
    audioDurationInSeconds: number;
};

export const CombinedScene: React.FC<CombinedSceneProps> = ({
                                                                imageUrl,
                                                                title,
                                                                bulletPoints,
                                                                heading,
                                                                audioDurationInSeconds,
                                                            }) => {
    const fps = 30;
    const scene1Duration = Math.round(audioDurationInSeconds * fps);
    const scene2Duration = Math.round(audioDurationInSeconds * fps);

    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={scene1Duration}>
                <SplitImageTitleScene
                    imageUrl={imageUrl}
                    title={title}
                    audioDurationInSeconds={audioDurationInSeconds}

                />
            </Sequence>

            <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
                <SplitImageBulletPointsScene
                    imageUrl={imageUrl}
                    heading={heading}
                    bulletPoints={bulletPoints}
                    audioDurationInSeconds={audioDurationInSeconds}
                    exitDurationInSeconds={2}
                />
            </Sequence>
        </AbsoluteFill>
    );
};
