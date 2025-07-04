import {AbsoluteFill, Sequence} from 'remotion';
import {PortraitIntro} from "./PortraitIntroScene";
import {PortraitTechSpec} from "./PortraitTechSpec";
import {PortraitHardwareSpec} from "./PortraitHardwareSpec";
import {PortraitPortAndRatings} from "./PortraitPortAndRatings";
import {PortraitWhatsInTheBox} from "./PortraitWhatsInTheBox";

type CommonConfig = {
    audioUrl: string,
    audioDurationInFrames: number,
}

type CombinedSceneProps = {
    introConfig: CommonConfig,
    techSpecConfig: CommonConfig,
    hardwareSpecConfig: CommonConfig,
    portAndRatingConfig: CommonConfig,
    boxContentsConfig: CommonConfig
};

export const CombinedScenesLaptop: React.FC<CombinedSceneProps> = ({
                                                                        introConfig,
                                                                        techSpecConfig,
                                                                        hardwareSpecConfig,
                                                                        portAndRatingConfig,
                                                                        boxContentsConfig
                                                            }) => {
    const overlap = 5;
    const imagePath = "https://d10plardpjo8sx.cloudfront.net/test/";
    const imageFileName = "laptop_frontview.png";
    console.log("Intro")
    return (
        <AbsoluteFill style={{position: 'relative', border: '10px solid red'}}>
            <h1 style={{color: 'white'}}>Intro Scene</h1>
            {/*<div style={{position: 'absolute', zIndex: 3, backgroundColor: 'rgba(255,0,0,0.2)'}}>*/}
                <Sequence from={0} durationInFrames={introConfig.audioDurationInFrames + overlap}>
                    <PortraitIntro
                        imagePath={imagePath}
                        imageFileName={imageFileName}
                        audioDurationInFrames={introConfig.audioDurationInFrames}
                        audioUrl={introConfig.audioUrl}
                        overlap={overlap}
                    />
                </Sequence>
            {/*</div>*/}
            {/*<div style={{position: 'absolute', zIndex: 2}}>*/}
                <Sequence from={introConfig.audioDurationInFrames - overlap}
                          durationInFrames={techSpecConfig.audioDurationInFrames + overlap}>
                    <PortraitTechSpec
                        imagePath={imagePath}
                        imageFileName={imageFileName}
                        audioDurationInFrames={techSpecConfig.audioDurationInFrames}
                        audioUrl={techSpecConfig.audioUrl}
                        overlap={overlap}
                    />
                </Sequence>
            {/*</div>*/}
            {/*<div style={{position: 'absolute', zIndex: 1}}>*/}
                <Sequence from={introConfig.audioDurationInFrames
                    + techSpecConfig.audioDurationInFrames - overlap}
                          durationInFrames={hardwareSpecConfig.audioDurationInFrames + overlap}>
                    <PortraitHardwareSpec
                        imagePath={imagePath}
                        imageFileName={imageFileName}
                        audioDurationInFrames={hardwareSpecConfig.audioDurationInFrames}
                        audioUrl={hardwareSpecConfig.audioUrl}
                        overlap={overlap}
                    />
                </Sequence>
            {/*</div>*/}
            <Sequence from={introConfig.audioDurationInFrames
                + techSpecConfig.audioDurationInFrames
                + hardwareSpecConfig.audioDurationInFrames - overlap}
                      durationInFrames={portAndRatingConfig.audioDurationInFrames}>
                <PortraitPortAndRatings
                    imagePath={imagePath}
                    imageFileName={imageFileName}
                    audioDurationInFrames={portAndRatingConfig.audioDurationInFrames}
                    audioUrl={portAndRatingConfig.audioUrl}
                />
            </Sequence>

            {/*<Sequence from={introConfig.audioDurationInFrames*/}
            {/*    + techSpecConfig.audioDurationInFrames*/}
            {/*    + hardwareSpecConfig.audioDurationInFrames*/}
            {/*    + portAndRatingConfig.audioDurationInFrames - overlap} durationInFrames={boxContentsConfig.audioDurationInFrames}>*/}
            {/*    <PortraitWhatsInTheBox*/}
            {/*        imagePath={imagePath}*/}
            {/*        imageFileName={"WhatsInTheBox-default.png"}*/}
            {/*        audioDurationInFrames={boxContentsConfig.audioDurationInFrames}*/}
            {/*        audioUrl={boxContentsConfig.audioUrl}*/}
            {/*        lottieFileName={"option1_data"}*/}
            {/*    />*/}
            {/*</Sequence>*/}
            <Sequence from={introConfig.audioDurationInFrames
                + techSpecConfig.audioDurationInFrames
                + hardwareSpecConfig.audioDurationInFrames
                + portAndRatingConfig.audioDurationInFrames
                // + boxContentsConfig.audioDurationInFrames
                - overlap} durationInFrames={boxContentsConfig.audioDurationInFrames}>
                <PortraitWhatsInTheBox
                    imagePath={imagePath}
                    imageFileName={"WhatsInTheBox-default.png"}
                    audioDurationInFrames={boxContentsConfig.audioDurationInFrames}
                    audioUrl={boxContentsConfig.audioUrl}
                    lottieFileName={"data"}
                />
            </Sequence>
        </AbsoluteFill>
    );
};
