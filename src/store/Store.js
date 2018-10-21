import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authenticated: "",
        newsLetters: [
            {
                title: 'Généralisation de la complémentaire santé : les entreprises ont fait évoluer leurs offres',
                date:'01/06/2018',
                content: '51 % en 2015, 84 % en 2017. La proportion des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à la mise en oeuvre de el est le constat dressé par lInstitut de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image1.jpg')
            },
            {
                title: 'Complémentaire santé Généralisation de la  : les entreprises ont fait évoluer leurs offres',
                date: '03/04/2018',
                content: 'La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à la mise en oeuvre de el est le constat dressé par lInstitut de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image1.jpg')
            },
            {
                title: 'Faire évoluer leurs offres complémentaire santé Généralisation de la  : les entreprises ont fait ',
                date: '027/03/2018',
                content: 'La mise en oeuvre de el est le constat dressé par lInstitut La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image2.jpg')
            },
            {
                title: 'Nouveau logo!',
                date: '01/06/2018',
                content: '51 % en 2015, 84 % en 2017. La proportion des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à la mise en oeuvre de el est le constat dressé par lInstitut de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image1.jpg')
            }, {
                title: 'Les entreprises ont fait évoluer leurs offres',
                date: '03/04/2018',
                content: 'La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à la mise en oeuvre de el est le constat dressé par lInstitut de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image2.jpg')
            }, {
                title: 'Amazon se lance à la conquête des assurances!',
                date: '27/03/2018',
                content: 'La mise en oeuvre de el est le constat dressé par lInstitut La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image2.jpg')
            }, {
                title: 'Les entreprises ont fait évoluer leurs offres',
                date: '03/04/2018',
                content: 'La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à la mise en oeuvre de el est le constat dressé par lInstitut de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image2.jpg')
            }, {
                title: 'Amazon se lance à la conquête des assurances!',
                date: '27/03/2018',
                content: 'La mise en oeuvre de el est le constat dressé par lInstitut La proportion des établissements qui proposent une complémentaire des établissements qui proposent une complémentaire santé à leurs salariés a bondi suite à de recherche et documentation en économie de la santé(Irdes) dans une enquête publiée hier.Pour rappel, l\'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d \'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s\' abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d \'adhésions des salariés.',
                imgUrl: require('../assets/image2.jpg')
            },
        ],
        holdings: [
            {
                name: 'Holding 1',
                totalCotisations: 121202,
                totalPrestations: 344594,
                totalTauxTele: 35,
                Documents: 1,
                entreprises: [
                    {
                        name: 'Entreprise 1',
                        NumSiret: 'FR6355214450300018',
                        adresse: '6 rue de la farandole 29069 A-Poile',
                        cotisations: 90990,
                        prestations: 23454,
                        Documents: '3',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 1',
                                type: 'santé base',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 14949,
                                prestations: 23242,
                                tauxCotisations: 45,
                                assures: [{
                                    name: 'robert Schmid',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: 2,
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
                                cotisations: 14344,
                                prestations: 54333,
                                tauxCotisations: 21,
                                assures: [{
                                        name: 'andrew Germain',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 2,
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy Cup',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: 3,
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
                        cotisations: 123440,
                        prestations: 22344,
                        Documents: '3',
                        contrats: [{
                                contrat: 'ensemble etc.. 3',
                                type: 'santé base',
                                assureur: 'Assureur 2',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 9080,
                                prestations: 12304,
                                tauxCotisations: 95,
                                assures: [{
                                    name: 'robert SchmidAAA',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: 1,
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
                                cotisations: 43214,
                                prestations: 81230,
                                tauxCotisations: 75,
                                assures: [{
                                        name: 'andrew GermainAAA',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 1,
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy CupAAA',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: 4,
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
                        cotisations: 123452,
                        prestations: 22344,
                        Documents: '3',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 5',
                                type: 'santé base',
                                assureur: 'Assureur 3',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 2345,
                                prestations: 9034,
                                tauxCotisations: 68,
                                assures: [
                                    {
                                        name: 'robert SchmidBBB',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 2,
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
                totalCotisations: 123455,
                totalPrestations: 212445,
                totalTauxTele: 55,
                Documents: 1,
                entreprises: [{
                        name: 'Entreprise 5',
                        NumSiret: 'FR6355214450300018',
                        cotisations: 123400,
                        prestations: 22344,
                        adresse: '6 rue de la farandole 29069 A-Poile',
                        Documents: '3', 
                        contrats: [{
                                contrat: 'ensemble etc.. 1',
                                type: 'santé base',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 32455,
                                prestations: 12344,
                                tauxCotisations: 97,
                                assures: [{
                                    name: 'robert Schmid',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: 3,
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
                                cotisations: 43321,
                                prestations: 14562,
                                tauxCotisations: 74,
                                assures: [{
                                        name: 'andrew Germain',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 4,
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy Cup',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: 3,
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
                        cotisations: 104990,
                        prestations: 54344,
                        Documents: '3',
                        contrats: [
                            {
                                contrat: 'cadre 4',
                                type: 'type X',
                                assureur: 'Assureur 2',
                                reseauDeSoin: 'Santé clair',
                                debut: '02/01/2018',
                                fin: '13/05/2019',
                                cotisations: 65433,
                                prestations: 87582,
                                tauxCotisations: 78,
                                assures: [{
                                        name: 'andrew GermainAAA',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 1,
                                        regime: 'général',
                                        teletransmission: 'Message',
                                        carte: '13/02/2017',
                                        Documents: '3',
                                    },
                                    {
                                        name: 'timmy CupAAA',
                                        birthdate: '28/85/1990',
                                        numSecu: '124141565616U5',
                                        beneficiaires: 2,
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
            },
            {
                name: 'Holding 4',
                totalCotisations: 121202,
                totalPrestations: 344594,
                totalTauxTele: 35,
                Documents: 1,
                entreprises: [
                    {
                        name: 'Entreprise 7',
                        NumSiret: 'FR6355214450300018',
                        adresse: '6 rue de la farandole 29069 A-Poile',
                        cotisations: 90990,
                        prestations: 23454,
                        Documents: '3',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 1',
                                type: 'santé base',
                                assureur: 'Assureur 1',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 14949,
                                prestations: 23242,
                                tauxCotisations: 45,
                                assures: [{
                                    name: 'robert Schmid',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: 2,
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
                                cotisations: 14344,
                                prestations: 54333,
                                tauxCotisations: 21,
                                assures: [{
                                    name: 'andrew Germain',
                                    birthdate: '28/02/1985',
                                    numSecu: '12415615616U5',
                                    beneficiaires: 2,
                                    regime: 'général',
                                    teletransmission: 'Message',
                                    carte: '13/02/2017',
                                    Documents: '3',
                                },
                                {
                                    name: 'timmy Cup',
                                    birthdate: '28/85/1990',
                                    numSecu: '124141565616U5',
                                    beneficiaires: 3,
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
                        name: 'Entreprise 8',
                        NumSiret: 'FR6355214450300018',
                        adresse: '5 rue de la fanfare 69069 Tout-nu',
                        cotisations: 123440,
                        prestations: 22344,
                        Documents: '3',
                        contrats: [{
                            contrat: 'ensemble etc.. 3',
                            type: 'santé base',
                            assureur: 'Assureur 2',
                            reseauDeSoin: 'Santé clair',
                            debut: '28/02/2018',
                            fin: '02/12/2019',
                            cotisations: 9080,
                            prestations: 12304,
                            tauxCotisations: 95,
                            assures: [{
                                name: 'robert SchmidAAA',
                                birthdate: '28/02/1985',
                                numSecu: '12415615616U5',
                                beneficiaires: 1,
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
                            cotisations: 43214,
                            prestations: 81230,
                            tauxCotisations: 75,
                            assures: [{
                                name: 'andrew GermainAAA',
                                birthdate: '28/02/1985',
                                numSecu: '12415615616U5',
                                beneficiaires: 1,
                                regime: 'général',
                                teletransmission: 'Message',
                                carte: '13/02/2017',
                                Documents: '3',
                            },
                            {
                                name: 'timmy CupAAA',
                                birthdate: '28/85/1990',
                                numSecu: '124141565616U5',
                                beneficiaires: 4,
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
                        name: 'Entreprise 9',
                        NumSiret: 'FR6355214450300018',
                        adresse: '5 rue de la fanfare 69069 Tout-nu',
                        cotisations: 123452,
                        prestations: 22344,
                        Documents: '3',
                        contrats: [
                            {
                                contrat: 'ensemble etc.. 5',
                                type: 'santé base',
                                assureur: 'Assureur 3',
                                reseauDeSoin: 'Santé clair',
                                debut: '28/02/2018',
                                fin: '02/12/2019',
                                cotisations: 2345,
                                prestations: 9034,
                                tauxCotisations: 68,
                                assures: [
                                    {
                                        name: 'robert SchmidBBB',
                                        birthdate: '28/02/1985',
                                        numSecu: '12415615616U5',
                                        beneficiaires: 2,
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
        ],
        mutations: {

        }
    }
})
