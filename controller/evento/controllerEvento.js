const DAOevento=require('../../model/DAO/eventoDAO.js')
const controllerUsuario=require('../../controller/usuario/controllerUsuario.js')
const message =require('../../modulo/config.js')

const inserirEvento = async (evento, contentType) => {
    try {
        if (contentType && contentType.includes('application/json')) {

            if (evento.titulo == ''                 || evento.titulo == undefined           || evento.titulo == null                                || evento.titulo.length>100              ||
                evento.descricao == ''              || evento.descricao == undefined        || evento.descricao == null                             || evento.descricao.length>60            ||
                evento.data_evento == ''            || evento.data_evento == undefined      || evento.data_evento == null                           || evento.data_evento.length>20          ||
                evento.horario == ''                || evento.horario == undefined          || evento.horario == null  || evento.horario.length>10  ||
                evento.horario == undefined         || evento.horario.length>15             || evento.horario == undefined                          || evento.horario.length>500             ||
                evento.id_usuario == ''             || evento.id_usuario==undefined         || evento.id_usuario == null
            ){

                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOevento.inserirEvento(evento)
                if (result) {
                    return message.SUCESS_CREATED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEvento = async (id, evento, contentType) => {
    try {
        if (contentType == 'application/json') {
            if (evento.titulo == ''                 || evento.titulo == undefined           || evento.titulo == null                                || evento.titulo.length>100              ||
                evento.descricao == ''              || evento.descricao == undefined        || evento.descricao == null                             || evento.descricao.length>60            ||
                evento.data_evento == ''            || evento.data_evento == undefined      || evento.data_evento == null                           || evento.data_evento.length>20          ||
                evento.horario == ''                || evento.horario == undefined          || evento.horario == null  || evento.horario.length>10  ||
                evento.horario == undefined         || evento.horario.length>15             || evento.horario == undefined                          || evento.horario.length>500             ||
                evento.id_usuario == ''             || evento.id_usuario==undefined         || evento.id_usuario == null
            ){

                return message.ERROR_REQUIRED_FIELDS
            }
            let result=await DAOevento.selectEventoById(id)
            if (result != false || typeof(result)== 'object') {
                if (result.length>0) {
                    evento.id=parseInt(id)
                    let result = await DAOusuario.updateGenro(genero)
                    if (result) {
                        return message.SUCESS_UPDATED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirEvento = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOevento.selectEventoById(parseInt(id))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOevento.deleteEvento(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarEvento = async function () {
    try {
        let dados={}
        let result = await DAOevento.selectAllEvento()
        
        if (result != false || typeof(result)=='object') {
        
            if(result.length>0){
                dados.status=true
                dados.status_code=200,
                dados.itens=result.length
                dados.usuario=result

                for (const itemEvento of result) {
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                    //Busca os dados da classificação na controller de classificacao
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemEvento.id_usuario)
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemEvento.usuario = dadosUsuario.usuario
                    //Remover um atributo do JSON
                    delete itemEvento.id_usuario

                    arrayEvento.push(itemEvento)
                }

                dados.eventos= arrayEvento

                return dados
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornarusuarios cadastrados
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER ///500
    }
}

const buscarEvento = async function (id) {
    let dados={}
    try {
        if (id == ''|| id == undefined|| id == null|| id<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOevento.selectEventoById(id)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dados={
                        status:true,
                        status_code:200,
                        usuario:result
                    }
                    return dadosGenero
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports={
    inserirEvento,
    atualizarEvento,
    excluirEvento,
    listarEvento,
    buscarEvento
}