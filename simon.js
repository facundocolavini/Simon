
  const btnEmpezar = document.getElementById('btnEmpezar')
  const celeste = document.getElementById('celeste')
  const violeta = document.getElementById('violeta')
  const naranja = document.getElementById('naranja')
  const verde = document.getElementById('verde')
  const ULTIMO_NIVEL = 10
  
  class Juego{
    constructor (){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel,500)
    }

    inicializar(){
      this.siguienteNivel = this.siguienteNivel.bind(this)
      this.elegirColor = this.elegirColor.bind(this) //Importante poner bind para atar la referencia del this a la clase juego 
      this.toggleBtnEmpezar()
      
      //btnEmpezar.setAttribute("hidden","enabled")
      this.nivel = 1
      this.colores = {
         //Podemos ahorrar los : y poner el nombre directo de la variable
        celeste,
        violeta,
        naranja,
        verde
      }
    }

    toggleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
      }else{
        btnEmpezar.classList.add('hide')
      }
    }

    generarSecuencia(){
      this.secuencia =  new Array (ULTIMO_NIVEL).fill(0).map(n=> Math.floor(Math.random()*4) )  //atributo nuevo  del juego 
    }

    siguienteNivel(){
      this.subnivel = 0 //para antes de pasar de nivel 
      this.iluminarSecuencia()
      this.agregarEventosClick()
    }
    
    transformarNumeroAColor(numero){//Trasnformo la secuencia de num a los colores
        switch (numero){
          //No hace falta el break por que ponemos un return para este caso.El break no se va a ejecutar nunca
          case 0: 
            return 'celeste'
          case 1: 
            return 'violeta'
          case 2: 
            return 'naranja'
          case 3: 
            return 'verde'
        }
    }

    transformarColorANumero(color){//Trasnformo la secuencia de num a los colores
        switch (color){
          //No hace falta el break por que ponemos un return para este caso.El break no se va a ejecutar nunca
          case 'celeste': 
                return 0
          case 'violeta': 
                return 1
          case 'naranja': 
                return 2
          case 'verde': 
                return 3
        }
    }
    
    iluminarSecuencia(){//Va rrecorer el array de la secuencia hasta el nivel que este el usuario
        for(let i=0 ;i<this.nivel;i++){//no usamos var por que  la variable color se va a ir pisando mediante transcurre el ciclo cuando entra al setTimeout agarra el ultimo color de la secuencia.
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(()=> this.iluminarColor(color), 1000 * i)
        
        } 
    }

    iluminarColor(color){//Le pasamos el color que tenemos que iluminar en pantalla
        this.colores[color].classList.add('light')
        setTimeout(()=> this.apagarColor(color),350)
      
    }
    
    apagarColor(color){
      this.colores[color].classList.remove('light')
     
    }

    agregarEventosClick(){
      this.colores.celeste.addEventListener('click',this.elegirColor)
      this.colores.violeta.addEventListener('click',this.elegirColor)
      this.colores.naranja.addEventListener('click',this.elegirColor)
      this.colores.verde.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click',this.elegirColor)
      this.colores.violeta.removeEventListener('click',this.elegirColor)
      this.colores.naranja.removeEventListener('click',this.elegirColor)
      this.colores.verde.removeEventListener('click',this.elegirColor)
    }
    
    elegirColor(ev){//target es el boton que se clickeo en el html
      //Logica si gana o pierde o si termina el juego
      //evento del mouse target es el boton que fue tocado
      const nombreColor  = ev.target.dataset.color
      const numeroColor = this.transformarColorANumero(nombreColor)
      this.iluminarColor(nombreColor)
      if(numeroColor  === this.secuencia[this.subnivel]){//Si toca bien la secuencia el usuario
        this.subnivel++
        if(this.subnivel === this.nivel){
          this.nivel++
          this.eliminarEventosClick()
          if(this.nivel === (ULTIMO_NIVEL + 1)){//Lo pongo entre parentesis (ULTIMO_NIVEL + 1) para que quede claro que es el ultimo nivel
            //Gana
            this.ganoElJuego()
          }else{
            setTimeout(this.siguienteNivel,1500)
          }
        }
      }else{
        //Pierde
        this.perdioElJuego()
      }
    }
    perdioElJuego(){
      swal('Perdiste','Lo lamentamos,perdiste :(','error')
      .then(()=>{
        this.eliminarEventosClick()
        this.inicializar()
      })
    }

    ganoElJuego(){
      swal('Ganaste','Felicitaciones,ganaste el juego!','success')
      .then(this.inicializar)
    }


  }
  
  
  function empezarJuego(){
    window.juego = new Juego()
  }

