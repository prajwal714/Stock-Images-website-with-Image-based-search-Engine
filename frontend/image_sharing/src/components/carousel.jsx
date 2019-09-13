import React, { Component } from 'react';
import { Button, Carousel } from 'antd';

const styles = {
  leftBtn: {
    position: 'absolute',
    top: window.innerHeight * 0.35,
    marginLeft: 20,
    zIndex: 1,
  },
  rightBtn: {
    position: 'absolute',
    top: window.innerHeight * 0.35,
    zIndex: 2,
  },
};

class BigCarousel extends Component {
  slider = null;

  slide = dir => (dir === 1 ? this.slider.next() : this.slider.prev());
  
  render() {
    const { images } = this.props;
    
    const goldenRatioHeight = window.innerHeight * 0.52;
    return (
      <div className="BigCarousel">
        <div style={{ textAlign: 'left' }}>
          <Button type="default" shape="circle" onClick={() => this.slide(-1)} icon="left" size="large" style={styles.leftBtn} />
        </div>
        <Carousel  ref={(r) => { this.slider = r; }} draggable adaptiveHeight>
          {
            images.map(image => (
              <div key={image}>
                <img src={image.downloadUrl} alt="" style={{ width: '100%', height: goldenRatioHeight }} />
              </div>
            ))
          }
        </Carousel>
        <div style={{ textAlign: 'right', marginRight: 60 }}>
          <Button type="default" shape="circle" onClick={() => this.slide(1)} icon="right" size="large" style={styles.rightBtn} />
        </div>
      </div>
    );
  }
}

export default BigCarousel;