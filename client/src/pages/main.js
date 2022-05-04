import React, { useEffect } from "react";
import ControlItem from '../components/user-control-item';

function Main() {
    const host = "";
    const [data, setData] = React.useState(null);
    const [buttonStatus, setButtonStatus] = React.useState(new Map());

    useEffect(() => {
        const timer = setInterval(getClient, 2000);
        return () => clearInterval(timer);
    }, []);

    const getClient = async () => {
        const result = await fetch(host + "/api/clients");
        const data = await result.json();
        setData(data);
    }

    const clearStatus = async (userId) => {
        console.log('clear status: ', userId);
        clearInterval(buttonStatus[userId].timer);
        buttonStatus[userId] = {
            status: 'enable',
            timer: null,
        }
        setButtonStatus(buttonStatus);
    }

    async function flush(userId) {
        console.log('flush', userId);
        const result = await fetch(host + "/api/clients/flush" + '?userId=' + userId);

        // set button status to disable and set timeout to enable
        const timer = setInterval(clearStatus.bind(this, userId), 10000);
        buttonStatus[userId] = {
            status: 'disabled',
            timer: timer,
        }
        setButtonStatus(buttonStatus);

        return result;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={require('../toilet.jpeg')} className="App-logo-no-animation" alt="logo" />
                {!data ? 'Loading...' : ''}
                {data && data.length > 0 && data.map((item, index) => {
                    return (<ControlItem status={buttonStatus[item]} userId={item} text={'Flush'} click={() => flush(item)} disabled={false}></ControlItem>)
                })}
            </header>
        </div>
    );
}

export default Main;
