import Series from "../series";
import { TextRendererAccessors, D3Selection, Datum, EventBus, RendererAccessor, RendererClass, RendererOptions, RendererType, State } from "../../typings";
export declare type Options = RendererOptions<TextRendererAccessors>;
declare class Text implements RendererClass<TextRendererAccessors> {
    data: Datum[];
    el: D3Selection;
    events: EventBus;
    options: Options;
    series: Series;
    size: RendererAccessor<number>;
    state: State;
    type: RendererType;
    xIsBaseline: boolean;
    x: RendererAccessor<number>;
    xScale: any;
    y: RendererAccessor<number>;
    yScale: any;
    offset: number;
    tilt: boolean;
    constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: Options, series: Series);
    update(data: Datum[], options: Options): void;
    dataForAxis(axis: "x" | "y"): any[];
    draw(): void;
    close(): void;
    private appendSeriesGroup(el);
    private assignAccessors(customAccessors);
    private assignConfig(customConfig);
    private setAxisScales();
    private validate(d);
    private startAttributes();
    private attributes();
}
export default Text;
