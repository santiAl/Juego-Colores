import { useEffect, useState,useRef } from 'react';
import { Api, Color } from './Api.tsx';
import {Popup} from './Popup.tsx';
import useTimer from "./useTimer.tsx"


enum Status{
  "Playing",
  "Waiting"
}


function App() {
  
  const [colors,setColors] = useState<Color[]>([]);
  const [status,setStatus] = useState<Status>(Status.Waiting);
  const [colorToGuess,setColorToGuess] = useState<Color>();
  const [bothColors, setBothColors] = useState<Color[]>([]);
  const [score,setScore] = useState<number>(0);
  const [scoreTable,setScoreTable]= useState<number[]>([]);
  

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showModal,setShowModal] = useState(false);

  const { elapsedTime , isRunning, handleStart, handlePause, handleReset } = useTimer();

  
  


    useEffect(()=>{
      if(score === 10){ 
        setStatus(Status.Waiting);
        if( scoreTable.length < 5 || score < scoreTable[scoreTable.length-1]){
          console.log('entra');
          setScoreTable((table) => table.includes(elapsedTime)? [...table] : [...table,elapsedTime].sort((a,b)=> a-b ).slice(0,5) );
        }
      }
    },[score])



  useEffect(()=>{
      Api().then((array)=> {
        setColors(array);
      } );
    },[])

  
  function winCondition( event : React.MouseEvent<HTMLButtonElement, MouseEvent>, colorName : string) : void {
    event.preventDefault()
    if(colorToGuess?.name === colorName){
          let [correctColor,wrongColor] = colors.slice().sort(()=> Math.random() - 0.5 );
          setColorToGuess(correctColor);
          setBothColors([correctColor,wrongColor].sort(()=> Math.random() - 0.5 )  );
          setScore((score) => score+1 );
          if(score + 1 === 10 ){
            handlePause();
          }
    }else{
      handlePause(); setStatus(Status.Waiting); setShowModal(true);
    }

  }
  
  const handlePlay =() =>{
     handleReset();
     handleStart();
     setStatus(Status.Playing); 
     setScore(0);
     let [correctColor,wrongColor] = colors.slice().sort(()=> Math.random() - 0.5 );
     setColorToGuess(correctColor);
     setBothColors([correctColor,wrongColor].sort(()=> Math.random() - 0.5 )  );   // To shuffle the position of the correct answer
  }


  const handleAnimation= () =>{
    if (buttonRef.current) {
      buttonRef.current.className = 'fade-play-button';
    }
  }

  return (
    <main>
      <header>
        <h1>{score} Puntos</h1>
        <div>Time { elapsedTime.toString().slice(0,-3) }{ elapsedTime > 1000? ',':'' }{ elapsedTime.toString().slice(-3) } </div>
        </header>
      { showModal && <Popup title="Game Over" text="" onClose={()=>{ setShowModal(false) }} />}

            <article>
                <p>Fastest Times</p>
                { scoreTable.map((score,index) => ( <div className={index % 2 === 0? 'table-row-even': 'table-row'} key={index}> <div className='position'> {index+1} </div> <div > { score.toString().slice(0,-3) }{ score > 1000? ',':'' }{ score.toString().slice(-3) } s </div>  </div> ) ) }
            </article>
                          { status === Status.Waiting ? <footer> {!showModal && <button ref={buttonRef} className='play-button' onAnimationEnd={handlePlay} onClick={handleAnimation} >Jugar</button>} </footer> : 
                              <div className='showUp'>
                                            <section>
                                                <span style={{color: bothColors[0].color  }}>{ colorToGuess?.name[0].toUpperCase() +  (colorToGuess?.name.slice(1).toLowerCase() || '')   }</span>
                                            </section>
                                
                                
                                
                                            <footer>
                                                  { bothColors.map((CurrentColor,index)=>(
                                                          <button className='color-button' key={index} style={{ backgroundColor: CurrentColor.color }} onClick={(e) => winCondition(e,CurrentColor.name)}></button>
                                                  )) 
                                                  } 
                                            </footer>
                                    
                              </div>  
                          }
    </main>
  );
}


export default App;
