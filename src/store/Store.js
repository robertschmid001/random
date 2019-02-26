import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // holdingTable: true,
        // entrepriseTable: false,
        // contratsTable: false,
        // assuresTable: false,
        // gEntTable: false,
        // eTable: true,
        // eConTable: false,
        // eAssTable: false,
        // cotTable: false,
        // prestTable: false,
        // tableHeader: true,
        // activeAssures: false,
        // detailsEntreprise: false,
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
        fullscreenLoading: false,
        holdings: [],
        cabinet: [],
        holdEnt: [],
        holdEntCont: [],
        translation: [],
        assure: [],
        filteredCotisations: [], //added
        cotisations: [],
        filteredAssures: [],
        multSelectStore: [],
        selection:[], //added
        selectedItems: [], //added
        parentBread: [], //added
        breadArray: [], //added
        docs: [], //added
        extrType: [], //added
        Main: [], //added
        appel: [], //added
        tableDocs: [], //added
        coCourtiers: [],
        eR:'e',
        spa: 's',
        mutations: {
        },
    },
})
