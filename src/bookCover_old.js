import React, { Component } from 'react';

// spent alot of time understanding the canvas stuff and
// no love from google. No cross origin headers in the images.
// leaving the code here for future reference

class BookCover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 128,
            height: '100%',
            image: this.props.image
        };
        this.resizeImage = this.resizeImage.bind(this);
    }

    componentDidMount() {
        this.resizeImage(this.state.image, document.createElement('canvas'), 200)
            .then((result) => {
                this.setState({
                    width: result.w,
                    height: result.h,
                    image: result.img
                });
            })
            .catch((error) => console.log(error));
    }


    resizeImage(img, canvas, maxHeight) {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = 'Anonymous';

            image.onload = function () {
                // scale the images so that all the heights are the same
                const ratio = maxHeight / this.height
                const context = canvas.getContext('2d');

                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = this.width * ratio;
                canvas.height = this.height * ratio;

                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                console.log(`newImageSize: ${image.width} x ${image.height}`);

                resolve({ w: image.width, h: image.height, img: canvas.toDataURL('image/jpeg') });
            };
            image.src = img;
        });
    }

    render() {

        return (
            <div className="book-cover" style={{
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                width: this.state.width,
                height: this.state.height,
                backgroundImage: `url("${this.state.image}")`
            }}
            />
        );
    }
}

export default BookCover;
