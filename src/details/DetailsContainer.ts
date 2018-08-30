import { loadSeries, loadSeriesComplete } from "@details/DetailsAction"
import UserRepository from "@service/user/UserRepository"
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "RootReducer"
import DetailsView, { DispatchProps, StateProps } from "./DetailsView"

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = (state: RootState): StateProps => ({
    series: state.DetailsReducer.series
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch: Dispatch): DispatchProps => ({
    loadSeries: (id: number) => {
        dispatch(loadSeries())
        UserRepository.instance.getSeries(id).then(series => dispatch(loadSeriesComplete(series)))
    }
})

export default connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(DetailsView)