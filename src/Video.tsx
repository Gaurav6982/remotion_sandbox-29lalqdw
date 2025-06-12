import {Composition} from 'remotion';
import {SplitImageTitleScene} from './SplitImageTitleScene';

export const RemotionVideo = () => {
    return <Composition
        id="SplitImageTitle"
        component={SplitImageTitleScene}
        durationInFrames={150} // can be dynamic
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
            imageUrl: 'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=2048x2048&w=is&k=20&c=-nRicEMFco-wjZrqf2MTWa5dlmVM312tNFy7Mw3Rj4I=',
            title: 'My Video Title',
            audioDurationInSeconds: 5,
        }}
    />
};
