import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authenticated: "",

        holdings: [
            {
                name: 'Holding 1',
                totalCotisations: '85841',
                totalPrestations: '75853',
                totalTauxTele: '35',
                entreprises: [
                    {
                        name: 'Entreprise 1',
                        NumSiret: 'FR6355214450300018',
                        adresse: '6 rue de la farandole 29069 A-Poile',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 1',
                                type: 'santé base',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: '12344',
                                prestations: '17489',
                                tauxCotisations: '34',
                                assures: [{
                                    name: 'robert Schmid',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: '6',
                                    regime: 'général',
                                    teletransmission: 'Message',
                                    carte: '13/02/2017',
                                    Documents: '5',
                                }]
                            },
                            {
                                contrat: 'cadre 2',
                                type: 'type X',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '02/01/2018',
                                fin: '13/05/2019',
                                cotisations: '12574',
                                prestations: '85489',
                                tauxCotisations: '25',
                                assures: [{
                                        name: 'andrew Germain',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: '2',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy Cup',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: '8',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '9',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Entreprise 2',
                        NumSiret: 'FR6355214450300018',
                        adresse: '5 rue de la fanfare 69069 Tout-nu',
                        contrats: [{
                                contrat: 'ensemble etc.. 3',
                                type: 'santé base',
                                assureur: 'Assureur 2',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: '12344',
                                prestations: '17489',
                                tauxCotisations: '34',
                                assures: [{
                                    name: 'robert SchmidAAA',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: '6',
                                    regime: 'général',
                                    teletransmission: 'Message',
                                    carte: '13/02/2017',
                                    Documents: '5',
                                }]
                            },
                            {
                                contrat: 'cadre 4',
                                type: 'type X',
                                assureur: 'Assureur 2',
                                reseauDeSoin: 'Santé clair',
                                debut: '02/01/2018',
                                fin: '13/05/2019',
                                cotisations: '12574',
                                prestations: '85489',
                                tauxCotisations: '25',
                                assures: [{
                                        name: 'andrew GermainAAA',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: '2',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy CupAAA',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: '8',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '9',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Entreprise 3',
                        NumSiret: 'FR6355214450300018',
                        adresse: '5 rue de la fanfare 69069 Tout-nu',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 5',
                                type: 'santé base',
                                assureur: 'Assureur 3',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: '12344',
                                prestations: '17489',
                                tauxCotisations: '34',
                                assures: [
                                    {
                                        name: 'robert SchmidBBB',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: '2',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '5',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Holding 2',
                totalCotisations: '98753',
                totalPrestations: '87456',
                totalTauxTele: '35',
                entreprises: [{
                        name: 'Entreprise 5',
                        NumSiret: 'FR6355214450300018',
                        adresse: '6 rue de la farandole 29069 A-Poile',
                        contrats: [{
                                contrat: 'ensemble etc.. 1',
                                type: 'santé base',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: '12344',
                                prestations: '17489',
                                tauxCotisations: '34',
                                assures: [{
                                    name: 'robert Schmid',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: '6',
                                    regime: 'général',
                                    teletransmission: 'Message',
                                    carte: '13/02/2017',
                                    Documents: '5',
                                }]
                            },
                            {
                                contrat: 'cadre 2',
                                type: 'type X',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '02/01/2018',
                                fin: '13/05/2019',
                                cotisations: '12574',
                                prestations: '85489',
                                tauxCotisations: '25',
                                assures: [{
                                        name: 'andrew Germain',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: '2',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy Cup',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: '8',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '9',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Entreprise 6',
                        NumSiret: 'FR6355214450300018',
                        adresse: '5 rue de la fanfare 69069 Tout-nu',
                        contrats: [
                            {
                                contrat: 'cadre 4',
                                type: 'type X',
                                assureur: 'Assureur 2',
                                reseauDeSoin: 'Santé clair',
                                debut: '02/01/2018',
                                fin: '13/05/2019',
                                cotisations: '12574',
                                prestations: '85489',
                                tauxCotisations: '25',
                                assures: [{
                                        name: 'andrew GermainAAA',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: '2',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy CupAAA',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: '8',
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '9',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],


        // holdings: [
        //     {
        //         name: 'Holding 1',
        //         cotisations:'456 123',
        //         prestations: '789 159',
        //         assure: '5',
        //         Beneficiaire: '2',
        //         contrats: '15',
        //         tauxTeletransmissions: 35,
        //         documents: 0,
        //         entreprises:[
        //             {
        //                 name: 'Entreprise 1',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Option X',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '132 465',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             },
        //             {
        //                 name: 'Entreprise 2',
        //                 typeContrat: 'Santé base',
        //                 contrats: [
        //                     {
        //                         name: 'Option Y', type:'santé base'
        //                     },
        //                     {
        //                         name: 'Option X'
        //                     },
        //                     {
        //                         name: 'Option Z'
        //                     },
        //                     {
        //                         name: 'Option A'
        //                     }
        //                 ],
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '456 123',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/08/2018',
        //             },
        //             {
        //                 name: 'Entreprise 3',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Ensemble personnel N° xxx RL',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '159 263',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             }
        //         ]
        //     },
        //     {
        //         name: 'Holding 2',
        //         cotisations: '478 965',
        //         prestations: '123 625',
        //         assure: '3',
        //         Beneficiaire: '5',
        //         contrats: '14',
        //         tauxTeletransmissions: 75,
        //         documents: 5,
        //         entreprises: [
        //             {
        //                 name: 'Entreprise 1',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Ensemble personnel N° xxx RL',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '789 451',
        //                 status: 'Impayé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             },
        //             {
        //                 name: 'Entreprise 2',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Option X',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '698 458',
        //                 status: 'Impayé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             }
        //         ]
        //     },
        //     {
        //         name: 'Holding 3',
        //         cotisations: '852 945',
        //         prestations: '425 756',
        //         assure: '1',
        //         Beneficiaire: '8',
        //         contrats: '9',
        //         tauxTeletransmissions: 55,
        //         documents: 2,
        //         entreprises: [
        //             {
        //                 name: 'Entreprise 1',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Option X',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '745 652',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             },
        //             {
        //                 name: 'Entreprise 2',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Ensemble personnel N° xxx RL',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '785 621',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             },
        //             {
        //                 name: 'Entreprise 3',
        //                 typeContrat: 'Santé base',
        //                 contrats: 'Ensemble personnel N° xxx RL',
        //                 debut: '01/01/2018',
        //                 fin: '05/04/2018',
        //                 montant: '125 984',
        //                 status: 'Payé',
        //                 declarationDsn: 'Oui',
        //                 reglement: 'Virement',
        //                 derniereRelance: '01/01/2018',
        //             }
        //         ]
        //     }
        // ],
        mutations: {

        }
    }
})
