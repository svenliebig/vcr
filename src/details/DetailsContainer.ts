import { loadSeries, loadSeriesComplete } from "@details/DetailsAction"
import UserRepository from "vcr-shared/service/UserRepository"
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "RootReducer"
import DetailsView, { DispatchProps, StateProps } from "./DetailsView"
import SeriesModel from "vcr-shared/models/SeriesModel"

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = (state: RootState): StateProps => ({
    series: state.DetailsReducer.series
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch: Dispatch): DispatchProps => ({
    loadSeries: (id: number) => {
        dispatch(loadSeries())
        UserRepository.instance.getSeries(id).then((series: SeriesModel) => dispatch(loadSeriesComplete(series)))
    }
})

export default connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(DetailsView)