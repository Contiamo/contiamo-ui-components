import { AxisClass, AxisComputed, AxisType, TimeAxisOptions, AxisPosition, D3Selection, EventBus, Object, Partial, State, StateWriter, TimeIntervals } from "../typings";
declare class TimeAxis implements AxisClass<Date> {
    computed: AxisComputed;
    data: Date[];
    el: D3Selection;
    end: Date;
    events: EventBus;
    interval: TimeIntervals;
    isXAxis: boolean;
    position: AxisPosition;
    previous: AxisComputed;
    start: Date;
    state: State;
    stateWriter: StateWriter;
    type: AxisType;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition);
    validate(value: any): boolean;
    private updateOptions(options);
    update(options: TimeAxisOptions, data: Date[]): void;
    compute(): void;
    computeInitial(): Object<any>;
    private computeTickWidth(ticksInDomain);
    private computeBars(defaultBarWidth, tickWidth);
    private computeRange(tickWidth, numberOfTicks);
    private computeTickNumber(ticksInDomain, range);
    private computeScale(range, ticks);
    private computeTicks(computed);
    computeAligned(computed: Partial<AxisComputed>): void;
    draw(): void;
    private drawTicks();
    private adjustMargins();
    private getAttributes();
    private getStartAttributes(attributes);
    private drawBorder();
    remove(): void;
}
export default TimeAxis;
