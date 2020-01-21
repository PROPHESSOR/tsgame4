import Component, {
  iComponentParams,
  defaultComponentParams,
} from '../Component';
import UI from '../../UI';
import { Vec2 } from '../../Math';
import Box from '../../Box';

/* eslint react/require-render-return: 0 */

export interface iButtonParams extends iComponentParams {
  background: string;
  color: string;
  borderSize: number;
  borderColor: string;
  text: string;
}

export const defaultButtonParams: iButtonParams = {
  ...defaultComponentParams,
  background: 'black',
  color: 'red',
  borderSize: 1,
  borderColor: 'red',
  text: '',
};

export default class Button extends Component {
  params: iButtonParams;

  constructor(
    ui: UI,
    position: Vec2,
    size: Vec2,
    params: iButtonParams | undefined = defaultButtonParams,
  ) {
    super(ui, position, size, new Box(position, size), params);
  }

  onClick(position: Vec2): boolean {
    if (this.hitbox.checkInside(position)) {
      this.emit('click');
      return true;
    }

    return false;
  }

  render() {
    const { ctx } = this.ui;

    ctx.fillStyle = this.params.background;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    );
    ctx.strokeStyle = this.params.borderColor;
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    ); // TODO: Use borderSize
    // ctx.strokeText(
    //   this.params.text,
    //   this.position.x,
    //   this.position.y,
    //   this.size.x,
    // );
  }
}
