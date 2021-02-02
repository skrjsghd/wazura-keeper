import React, {useState} from 'react'

function ServiceModal({info, show, accept}) {
    const service = ['소주 1병', '맥주 1병', '사이드 1인분']
    const [selectService, setSelectService] = useState(0);

    function onChangeHandler(e){
        setSelectService(Number(e.target.id))
    }

    const displayServices = service.map((data, index) => (
        <div key={index}>
            <label>{data}{index}</label>
            <input id={index} type="radio" name="service" value={data} onChange={onChangeHandler} checked={selectService === index} />
        </div>
    ))

    return (
        <div>
            <div>
                {displayServices}
            </div>
            <button onClick={() => accept(info, service[selectService])}>수락</button>
            <button onClick={() => show()}>거절</button>
        </div>
    )
}

export default ServiceModal
