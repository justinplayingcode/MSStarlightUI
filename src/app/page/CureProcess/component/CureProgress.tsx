import { Stack } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CureProgress = () => {
    const [step, setStep] = useState<number>(0);

    const navigate = useNavigate();

    return(
        <div className='wrapper-table-content'>
            {/* <Stack className='form-header'
                onClick={() => navigate(-1)}>
                    <Stack className='header-text'>&larr; Trở lại trang trước</Stack>
            </Stack> */}
            <Stack>

            Bắt đầu khám
            </Stack>
        </div>
    )
}

export default CureProgress;