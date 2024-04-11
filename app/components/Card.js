import React from "react";
import styled from "styled-components";

const Card = (props) => {
    
    return (
        <CardStyled className="w-60 h-96 border-4 border-teal-200 border-solid rounded">
            <img className="w-full h-5/6 border-b-4 border-teal-200 border-solid" src={props.image_url} />
            <div className="">
                
                <p className="text-center p-3 font-serif font-semibold text-zinc-300 opacity-1">{props.title}</p>
            </div>
        </CardStyled>
    );
}

const CardStyled = styled.nav`
    .add_remove_buttons {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
    }
    .buttons_hover:hover button{
        opacity:1;

    }
    .buttons_hover:hover p{
        opacity:0;

    }
    
`;

export default Card;
