import { EventEmitter } from '../Utils';
import { Vec2 } from '../Math';
import Box from '../Box';
import UI from '../UI';

export interface iComponentParams {
  visible: boolean;
  active: boolean;
  disabled: boolean;
  hover: boolean;
}

export const defaultComponentParams: iComponentParams = {
  visible: true,
  active: false,
  disabled: false,
  hover: false,
};

export default abstract class Component extends EventEmitter
  implements iComponentParams {
  visible: boolean;
  active: boolean;
  disabled: boolean;
  hover: boolean;
  position: Vec2;
  size: Vec2;
  hitbox: Box | null;
  ui: UI;
  params: iComponentParams;

  constructor(
    ui: UI,
    position: Vec2,
    size: Vec2,
    hitbox: Box = null,
    params: iComponentParams = defaultComponentParams,
  ) {
    super();
    this.ui = ui;
    this.position = position;
    this.size = size;
    this.hitbox = hitbox;
    this.active = params.active;
    this.hover = params.hover;
    this.disabled = params.disabled;
    this.visible = params.visible;
    this.params = params;
  }

  abstract onClick(position: Vec2): boolean;

  abstract render();
}
