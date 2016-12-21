export interface DataSet {
    datasets: DataPoint[];
}

export interface DataPoint {
    label: string;
    backgroundColor: string;
    data: PositionData[];
}

export interface PositionData {
    x : number;
    y : number;
    r : number;
}
