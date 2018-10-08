import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authenticated: "",
        holdings: [
            {
                name: 'Holding 1',
                cotisations:'456 123',
                prestations: '789 159',
                assure: '5',
                Beneficiaire: '2',
                contrats: '15',
                tauxTeletransmissions: 35,
                documents: 0,
                entreprises:[
                    {
                        name: 'Entreprise 1',
                        typeContrat: 'Santé base',
                        contrats: 'Option X',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '132 465',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    },
                    {
                        name: 'Entreprise 2',
                        typeContrat: 'Santé base',
                        contrats: 'Option Y',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '456 123',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/08/2018',
                    },
                    {
                        name: 'Entreprise 3',
                        typeContrat: 'Santé base',
                        contrats: 'Ensemble personnel N° xxx RL',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '159 263',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    }
                ]
            },
            {
                name: 'Holding 2',
                cotisations: '478 965',
                prestations: '123 625',
                assure: '3',
                Beneficiaire: '5',
                contrats: '14',
                tauxTeletransmissions: 75,
                documents: 5,
                entreprises: [
                    {
                        name: 'Entreprise 1',
                        typeContrat: 'Santé base',
                        contrats: 'Ensemble personnel N° xxx RL',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '789 451',
                        status: 'Impayé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    },
                    {
                        name: 'Entreprise 2',
                        typeContrat: 'Santé base',
                        contrats: 'Option X',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '698 458',
                        status: 'Impayé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    }
                ]
            },
            {
                name: 'Holding 3',
                cotisations: '852 945',
                prestations: '425 756',
                assure: '1',
                Beneficiaire: '8',
                contrats: '9',
                tauxTeletransmissions: 55,
                documents: 2,
                entreprises: [
                    {
                        name: 'Entreprise 1',
                        typeContrat: 'Santé base',
                        contrats: 'Option X',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '745 652',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    },
                    {
                        name: 'Entreprise 2',
                        typeContrat: 'Santé base',
                        contrats: 'Ensemble personnel N° xxx RL',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '785 621',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    },
                    {
                        name: 'Entreprise 3',
                        typeContrat: 'Santé base',
                        contrats: 'Ensemble personnel N° xxx RL',
                        debut: '01/01/2018',
                        fin: '05/04/2018',
                        montant: '125 984',
                        status: 'Payé',
                        declarationDsn: 'Oui',
                        reglement: 'Virement',
                        derniereRelance: '01/01/2018',
                    }
                ]
            }
        ],
        mutations: {

        }
    }
})
