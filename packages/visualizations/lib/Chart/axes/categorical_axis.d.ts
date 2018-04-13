import { AxisClass, AxisComputed, AxisPosition, AxisType, CategoricalAxisOptions, D3Selection, EventBus, State, StateWriter } from "../typings";
declare class CategoricalAxis implements AxisClass<string> {
    computed: AxisComputed;
    data: string[];
    el: D3Selection;
    events: EventBus;
    isXAxis: boolean;
    position: AxisPosition;
    previous: AxisComputed;
    sort: boolean;
    state: State;
    stateWriter: StateWriter;
    type: AxisType;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition);
    validate(value: any): boolean;
    update(options: CategoricalAxisOptions, data: string[]): void;
    compute(): void;
    private computeTickWidth();
    private computeBarPositions(defaultBarWidth, tickWidth);
    private computeRange(tickWidth);
    draw(): void;
    private drawTicks();
    private scaleWithOffset(computed);
    private getAttributes();
    private getStartAttributes(attributes);
    private adjustMargins();
    private drawBorder();
    remove(): void;
}
export default CategoricalAxis;
