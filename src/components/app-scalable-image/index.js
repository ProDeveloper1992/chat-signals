import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';

export default class ScalableImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratio: 1,
        };
    }

    componentDidMount() {
        this.getAspectRatio();
    }

    getAspectRatio = () => {
        Image.getSize(this.props.src, (height, width) => {
            this.setState({
                ratio: height / width,
            });
        });
    };

    render() {
        const { src, children, blurRadius, borderRadius } = this.props;
        const { ratio } = this.state;
        return (
            <ImageBackground
                source={{
                    uri: src,
                }}
                style={{
                    width: '100%',
                    aspectRatio: ratio,
                }}
                resizeMode="contain"
                borderRadius={borderRadius ? borderRadius : 0}
                blurRadius={blurRadius ? blurRadius : 0}
            >
                {children}
            </ImageBackground>
        );
    }
}
