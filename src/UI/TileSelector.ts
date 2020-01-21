import Screen from '../Screen';
import UI from '../UI';
import { Vec2 } from '../Math';
import Button from './Components/Button';

const OFFSET_X = 25;
const OFFSET_Y = 25;
const BTN_SIZE = 25;
const BTN_OFFSET = 2.5;
const BTN_GAP = 5;

export default class TileSelector extends Screen {
  position: Vec2;
  size: Vec2;

  constructor(ui: UI) {
    super(ui);

    let btnyposition = OFFSET_Y + BTN_GAP;
    this.addBrushBtn(btnyposition, 'EmptyCell');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'TestCell');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'RotateCellClockwise');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'RotateCellAntiClockwise');

    this.size = new Vec2(30, btnyposition + BTN_GAP);
  }

  private onBtnClick(brushName) {
    this.ui.game.board.changeBrush(brushName);
  }

  private addBrushBtn(y, brushName) {
    const brushbtn = this.generateButton(y);
    brushbtn.on('click', () => this.onBtnClick(brushName));
    this.components.push(brushbtn);
  }

  private generateButton(y) {
    const { board } = this.ui.game;

    const btnxposition = board.right + OFFSET_X + BTN_OFFSET;

    return new Button(
      this.ui,
      new Vec2(btnxposition, y),
      new Vec2(BTN_SIZE, BTN_SIZE),
    );
  }

  // TODO: HOW TO USE it? .next()?
  *getNextBtnYPosition() {
    for (let i = 0; i < 10; i++) {
      yield OFFSET_Y + BTN_GAP * i;
    }
  }

  render() {
    const { ctx } = this.ui;

    ctx.fillStyle = 'green';
    ctx.fillRect(
      // FIXME: Some trash
      this.ui.game.board.right + OFFSET_X,
      OFFSET_Y,
      this.size.x,
      this.size.y,
    );

    this.components.forEach(component => component.render());
  }
}
