import {storageSession} from './storages'
export const getToken = function(){
    return storageSession.getItem('authorized-token')
}