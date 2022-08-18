const exercicios = [];

class ExerciciosRepository {
    save(ex){
        exercicios.push(ex);
    }
    random(){
        let randomIndx = Math.floor(Math.random()*exercicios.length);
        return exercicios[randomIndx];
    }
    list(disciplina){
        let exc = exercicios.filter(exc => exc.disciplina == disciplina);
        return exc;
    }
    detail(id){
        let exc = exercicios.find(exc => exc.id == id);
        return exc;
    }
}

module.exports = ExerciciosRepository;