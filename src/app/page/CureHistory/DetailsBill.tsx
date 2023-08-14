import Api from "api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MappingTypeAppointmentSchedule, toastType } from "src/model/enum";
import { closeLoading, openLoading, showToastMessage } from "src/redux/reducers";
import "./index.scss";
import UniformSection from "src/app/common/Section";
import { basicKeyValueRender } from "src/utils/utils";

function DetailsBill() {
  const { id: scheduleId } = useParams();
  const [currentState, setCurrentState] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    getInformation();
  }, [])

  const getInformation = () => {
    dispatch(openLoading());
    Api.historyMedicalApi.getDetailsBill(scheduleId).then(data => {
      if(data.status) {
        dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
        navigate(-1);
      } else {
        setCurrentState(data.data);
        setDetails(JSON.parse(data.data?.detail));
      }
    }).catch(() => {
      dispatch(showToastMessage({message: "Có lỗi xảy ra, hãy thử lại", type: toastType.error}));
      navigate(-1);
    }).finally(() => dispatch(closeLoading()))
  }

  const renderInfoSchedule = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Kiểu khám", details?.typeAppointment)}
        {basicKeyValueRender("Giá tiền", details?.price)}
      </>
    )
  }
  
  const renderService = (): JSX.Element => {
    if(details?.services?.length > 0) {
      const element = details?.services?.map((e, i) => {
        return <div key={i}>
          {basicKeyValueRender("Loại", e?.serice)}
          {basicKeyValueRender("Giá tiền", `${e?.price} đ`)}
        </div>
      })

      return (
        <UniformSection
            headerTitle="Thông tin các dịch vụ"
            elementInner={element}
            className="cure-details-content-item bill"
        />
      ) 
    } else {
      return <></>
    }
  }

  const renderPrescription = (): JSX.Element => {
    if(details?.prescription?.length > 0) {
      const element = details?.prescription?.map((e, i) => {
        return <div key={i}>
          {basicKeyValueRender("Loại", e?.name)}
          {basicKeyValueRender("Giá tiền", `${e?.price} đ`)}
        </div>
      })

      return (
        <UniformSection
            headerTitle="Thông tin đơn thuốc"
            elementInner={element}
            className="cure-details-content-item bill"
        />
      ) 
    } else {
      return <></>
    }
  }

  const renderTotal = (): JSX.Element => {
    return (
      <>
        {basicKeyValueRender("Mức hưởng BHYT", details?.discount)}
        {basicKeyValueRender("Thành tiền", `${currentState?.totalCost} đ`)}
      </>
    )
  }

  return (  
    <div className='wrapper-content cure-details'>
      <div className='wrapper-content-inner cure-details-wrapper'>
        <div className="cure-details-header">Thông tin hóa đơn</div>
        <div className="cure-details-content">
          <UniformSection
            headerTitle="Thông tin lần khám"
            elementInner={renderInfoSchedule()}
            className="cure-details-content-item"
          />
          {renderService()}
          {renderPrescription()}
          <UniformSection
            headerTitle="Tổng cộng"
            elementInner={renderTotal()}
            className="cure-details-content-item"
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsBill;