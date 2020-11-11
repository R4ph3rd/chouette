module.exports = {
    namedResults : (result) => {
        if(typeof result == 'string'){
            switch (result) {
                case 'linotte' : 
                    return 1;
                    break;
                case 'alouette' : 
                    return 2;
                    break;
                case 'fauvette' : 
                    return 3;
                    break;
                case 'mouette' : 
                    return 4;
                    break;
                case 'bergeronette' : 
                    return 5;
                    break;
                case 'chouette' : 
                    return 6;
                    break;
                default:
                    return "L'expression fournie n'est pas valide.";                
            }
        } else if(typeof result == 'number'){
            switch (result) {
                case 1 : 
                    return 'linotte';
                    break;
                case 2 : 
                    return 'alouette';
                    break;
                case 'fauvette' : 
                    return 3;
                    break;
                case 4 : 
                    return 'mouette';
                    break;
                case 5 : 
                    return 'bergeronette';
                    break;
                case 6 : 
                    return 'chouette';
                    break;
                default: 
                    return "L'expression fournie n'est pas valide.";
            }
        }
    }
}