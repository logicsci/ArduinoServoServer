import { FormGroup, FormLabel, Button } from '@mui/material';
import { css, jsx } from '@emotion/react'
import './user-control-item.css';

function ControlItem(props) {
    // props.status

    return (
        <FormGroup css={css`
                              display: inline;
                        `}
        >
            <FormLabel sx={{color: "white"}}>{props.userId}</FormLabel>
            <Button onClick={() => props.click()}>{props.text}</Button>
        </FormGroup>
    )
}

export default ControlItem;
