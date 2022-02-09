import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
          src: Utils.asset('images/bg_plane.jpg'), 
          w: 1920/2, 
          h: 1080/2
      },
      
      MyImage: {
          shader: {type: lng.shaders.Grayscale, amount: 1},
          x: 100,
          y: 100,
          src: Utils.asset('images/flowerTop.png')
      },
      Cell: {
          texture: {type: lng.textures.ImageTexture, src: Utils.asset('images/cells.png')}, 
          colorUl: 0x0000ffff, colorBr: 0x0000ffff,
      }
    }
  }

  _init(){
      const myCell = this.tag("Cell");
      myCell.setSmooth('texture.x', 400); 
      myCell.setSmooth('texture.y', 200);

      this._myImageAnimation = this.tag('MyImage').animation({
          duration: 4,
          repeat: -1,
          actions:[
              {p: 'x', v: {0: 50, 0.15: 250, 0.35: 500, 0.55: 450, 0.75: 200, 0.95: 432, 1: 101}},
              {p: 'y', v: {0: 50, 0.15: 250, 0.35: 50, 0.55: 100, 0.75: 200, 0.95: 52, 1: 50 }}
          ]
      });
      this._myImageAnimation.on('progress', (p)=>{
          let _imageX = this.tag('MyImage').x;
          let _imageY = this.tag('MyImage').y;
          myCell.patch({ x: _imageX });
          myCell.patch({ y: _imageY });
      });
      this._myImageAnimation.start();
  }
}
