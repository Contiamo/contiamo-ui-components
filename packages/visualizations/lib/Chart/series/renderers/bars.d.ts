import Series from "../series";
import { BarsRendererAccessors, D3Selection, Datum, EventBus, RendererAccessor, RendererClass, RendererOptions, RendererType, State } from "../../typings";
export declare type Options = RendererOptions<BarsRendererAccessors>;
declare class Bars implements RendererClass<BarsRendererAccessors> {
    barWidth: RendererAccessor<number>;
    color: RendererAccessor<string>;
    data: Datum[];
    el: D3Selection;
    events: EventBus;
    options: Options;
    quantIsY: boolean;
    series: Series;
    state: any;
    type: RendererType;
    x: RendererAccessor<number | Date | string>;
    x0: RendererAccessor<number>;
    x1: RendererAccessor<number>;
    xScale: any;
    y: RendererAccessor<number | Date | string>;
    y0: RendererAccessor<number>;
    y1: RendererAccessor<number>;
    yScale: any;
    constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: Options, series: Series);
    update(data: Datum[], options: Options): void;
    draw(): void;
    close(): void;
    dataForAxis(axis: "x" | "y"): any[];
    private appendSeriesGroup(el);
    private setAxisScales();
    private validate(d);
    private assignAccessors(customAccessors);
    private seriesTranslation();
    private attributes();
}
export default Bars;
