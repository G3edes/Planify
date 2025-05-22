const DAOevento=require('../../model/DAO/usuarioDAO.js')
const message =require('../../modulo/config.js')

const inserirUsuario = async (usuario, contentType) => {
    try {
        if (contentType && contentType.includes('application/json')) {

            if (usuario.nome == ''                || usuario.nome == undefined            || usuario.nome == null             || usuario.nome.lenght>100            ||
            usuario.email == ''                   || usuario.email == undefined           || usuario.email == null            || usuario.email.lenght>60            ||
            usuario.senha == ''                   || usuario.senha == undefined           || usuario.senha == null            || usuario.senha>20                   ||
            usuario.data_nascimento == ''         || usuario.data_nascimento == undefined || usuario.data_nascimento == null  || usuario.data_nascimento.lenght>10  ||
            usuario.palavra_chave == undefined    || usuario.palavra_chave .lenght>15     ||
            usuario.foto_perfil == undefined      || usuario.foto_perfil.lenght>500){

                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOevento.inserirUsuario(usuario)
                if (result) {
                    return message.SUCCESS_CREATED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

const atualizarUsuario = async (id, usuario, contentType) => {
    try {
        if (contentType == 'application/json') {
            if (usuario.nome == ''                || usuario.nome == undefined            || usuario.nome == null             || usuario.nome.lenght>100            ||
            usuario.email == ''                   || usuario.email == undefined           || usuario.email == null            || usuario.email.lenght>60            ||
            usuario.senha == ''                   || usuario.senha == undefined           || usuario.senha == null            || usuario.senha>20                   ||
            usuario.data_nascimento == ''         || usuario.data_nascimento == undefined || usuario.data_nascimento == null  || usuario.data_nascimento.lenght>10  ||
            usuario.palavra_chave == undefined    || usuario.palavra_chave .lenght>15     ||
            usuario.foto_perfil == undefined      || usuario.foto_perfil.lenght>500){

                return message.ERROR_REQUIRED_FIELDS
            }
            let result=await DAOevento.selectusuarioById(id)
            if (result != false || typeof(result)== 'object') {
                if (result.length>0) {
                    usuario.id=parseInt(id)
                    let result = await DAOusuario.updateGenro(genero)
                    if (result) {
                        return message.SUCCESS_UPDATED_ITEM
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
       return message.ERROR_INTERNAL_SERVER_CONTROLER 
    }
}

const excluirUsuario = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOevento.selectusuarioById(parseInt(id))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOUser.deleteUsuario(parseInt(id))

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

const listarUsuario = async function () {
    try {
        let dados={}
        let result = await DAOUser.selectAllUsuario()
        
        if (result != false || typeof(result)=='object') {
        
            if(result.length>0){
                dados.status=true
                dados.status_code=200,
                dados.itens=result.length
                dados.usuario=result
                return dados
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornarusuarios cadastrados
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLER ///500
    }
}

const buscarUsuario = async function (id) {
    let dados={}
    try {
        if (id == ''|| id == undefined|| id == null|| id<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOUser.selectusuarioById(id)
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
        return message.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports={
    inserirUsuario,
    listarUsuario,
    buscarUsuario,
    excluirUsuario,
    atualizarUsuario
}