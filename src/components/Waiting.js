import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import WaitingList from './WaitingList';
import ProgressList from './ProgressList';
import DoneList from './DoneList';
import ServiceModal from './ServiceModal';

const socket = io('http://localhost:5000/keeper', {
    autoConnect: false
});
const storeId = uuidv4();

function Waiting() {
    const [waitingList, setWaitingList] = useState([]);
    const [progressList, setProgressList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sel, setSel] = useState("");

    useEffect(() => {
        socket.open();
        socket.on('connect', ()=>{
            socket.on('reservation:send', (info) => {
                setWaitingList((prevState) => ([...prevState, info]))
            })
            socket.on('reservation:done', (result) => {
                setProgressList((prevState) => (prevState.filter(
                    done => done.userInfo.customer_id !== result.userInfo.customer_id
                )));
                
                if(result.userInfo.store_id === storeId){
                    setDoneList((prevState) => ([...prevState, result]))

                }
            })
            socket.on('reservation:cancel_disconnect', (target) => {
                setWaitingList((prevState) => (prevState.filter(
                    data => data.userInfo.customer_id !== target.userInfo.customer_id
                )));

                setProgressList((prevState) => (prevState.filter(
                    data => data.userInfo.customer_id !== target.userInfo.customer_id
                )));
            })
        })
    },[])
    
    function onAcceptHandler(info, service){
        setShowModal(false);
        const progressInfo = {
            ...info,
            userInfo: {
                ...info.userInfo,
                store_id: storeId
            },
            reservation: {
                ...info.reservation,
                status: 'PROGRESS',
                service: service
            }}

        socket.emit('reservation:service', progressInfo)
        const newList = waitingList.filter(user => user.userInfo.customer_id !== info.userInfo.customer_id)
        setWaitingList(newList);
        setProgressList((prevState) => [...prevState, progressInfo])    
    }

    function onRejectHandler(data){
        if(data.reservation.status === 'WAITING'){
            const newList = waitingList.filter(user => user.userInfo.customer_id !== data.userInfo.customer_id)
            setWaitingList(newList);    
        } else if(data.reservation.status === 'PROGRESS'){
            const newProgress = progressList.filter(user => user.userInfo.customer_id !== data.userInfo.customer_id)
            setProgressList(newProgress)
        }
        socket.emit('reservation:cancel_keeper', data.userInfo.store_id, data.userInfo.customer_id)
    }

    function showModalHandler(info){
        if(showModal === false){
            setSel(info);
            setShowModal(!showModal);
        } else{
            setSel("");
            setShowModal(false);
        }
        
    }

    return (
        <div>
            {showModal ? <ServiceModal info={sel} show={showModalHandler} accept={onAcceptHandler} /> : null}
            {doneList.map((info, index) => (
                <DoneList key={index} info={info}/>
            ))}
            {progressList.map((info, index) => (
                <ProgressList key={index} info={info} deleteList={onRejectHandler}/>
            ))}
            {waitingList.map((info, index) => (
                <WaitingList key={index} info={info} selection={showModalHandler} deleteList={onRejectHandler}/>
            ))}
            
        </div>
    )
}

export default Waiting
