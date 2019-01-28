import React from "react";

const shock = ["BarneyShock", "HuskyShock", "BatShock", "LadyShock", "BrowShock", "MonkeyShock", "CatShock", "GirlShock", "SpockShock", "DogShock", "TrumpShock", "DudeShock"];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function ShockButton(props) {
    const imgUrl = "images/" + props.name + ".jpg";
    return <button > < img src = {imgUrl} alt = {props.name} onClick = {props.onClick} /></button>
}

class Board extends React.Component {

    renderShockButton(shock) {
        const name = this.props.shock[shock];
        return <ShockButton name = {
            name
        }
        onClick = {
            () => this.props.onClick(name)
        }
        />
    }

    render() {
        return ( 
            <div>
             <div> 
               {this.renderShockButton(0)} 
               {this.renderShockButton(1)}
               {this.renderShockButton(2)}
               {this.renderShockButton(3)} 
             </div>
             <div> 
               {this.renderShockButton(4)}
               {this.renderShockButton(5)} 
               {this.renderShockButton(6)} 
               {this.renderShockButton(7)} 
             </div>
             <div> 
               {this.renderShockButton(8)} 
               {this.renderShockButton(9)} 
               {this.renderShockButton(10)} 
               {this.renderShockButton(11)} 
             </div>
             </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shuffledShock: shuffle(shock),
            score: 0,
            topscore: 0,
            clickedShock: [],
            message: "Clicky Game"
        }
    }

    handleClick(shock) {
        let {
            score,
            topscore,
            clickedShock
        } = this.state;
        if (clickedShock.includes(shock)) {
            score = 0;
            this.setState({
                score: 0,
                clickedShock: [],
                message: "You guessed incorrectly! Start over."
            });
        } else {
            score++;
            topscore = score > topscore ? score : topscore;
            let message = "You guessed correctly!";
            clickedShock = clickedShock.concat([shock]);
            if (score === 12) {
                score = 0;
                clickedShock = [];
                message = "Awesome! You got them all!";
            }
            this.setState({
                shuffledShock: shuffle(shock),
                score: score,
                topscore: topscore,
                clickedShock: clickedShock,
                message: message
            });
        }
    }

    render() {
        const {message,score,topscore,shuffledShock} = this.state;
        return ( 
          <div>
            <h2> Click an image to earn a point, but don 't click any more than once.</h2>
            <h1> {message} </h1>
            <h1> Score: {score} &nbsp; &nbsp; Top Score: {topscore} </h1> 
            <Board shock = {shuffledShock} onClick = {(shock) => this.handleClick(shock)} /> 
          </div>
        );
    }
}

export default Game;