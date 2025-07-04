import { AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame } from 'remotion';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();

    // Animations
    const imageScale = interpolate(frame, [0, 50], [0.8, 1], {
        extrapolateRight: 'clamp',
    });

    const textSlideInY = interpolate(frame, [25, 50], [500, 140], {
        extrapolateRight: 'clamp',
    });

    const subTextSlideX = interpolate(frame, [75, 100], [1080, 100], {
        extrapolateRight: 'clamp',
    });

    const ctaScale = interpolate(frame, [350, 400], [0.5, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {/* Background Product Image */}
            <Sequence from={0} durationInFrames={250}>
                <Img
                    src={"https://i.ibb.co/SXy9nsSt/laptop.png"}
                    style={{
                        width: 800,
                        height: 800,
                        transform: `scale(${imageScale})`,
                        position: 'absolute',
                        left: 140,
                        top: 560,
                    }}
                />
            </Sequence>

            {/* Main Title */}
            <Sequence from={25} durationInFrames={175}>
                <div
                    style={{
                        position: 'absolute',
                        top: textSlideInY,
                        left: 100,
                        fontSize: 48,
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                    }}
                >
                    Introducing the All-New Gadget
                </div>
            </Sequence>

            {/* Subtext */}
            <Sequence from={75} durationInFrames={225}>
                <div
                    style={{
                        position: 'absolute',
                        top: 210,
                        left: subTextSlideX,
                        fontSize: 36,
                        fontFamily: 'Helvetica',
                    }}
                >
                    Now with enhanced features
                </div>
            </Sequence>

            {/* CTA */}
            <Sequence from={350} durationInFrames={100}>
                <div
                    style={{
                        position: 'absolute',
                        top: 300,
                        left: 100,
                        fontSize: 42,
                        fontFamily: 'Helvetica',
                        color: '#cc0000',
                        transform: `scale(${ctaScale})`,
                    }}
                >
                    Available Now
                </div>
            </Sequence>

            {/* Logo */}
            <Sequence from={500}>
                <Img
                    src={"https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=2048x2048&w=is&k=20&c=-nRicEMFco-wjZrqf2MTWa5dlmVM312tNFy7Mw3Rj4I="}
                    style={{
                        width: 200,
                        height: 200,
                        position: 'absolute',
                        left: 440,
                        top: 1660,
                    }}
                />
            </Sequence>
        </AbsoluteFill>
    );
};
