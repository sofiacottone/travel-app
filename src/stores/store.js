import { defineStore } from 'pinia';
import axios from '../axios';

export const useTripsStore = defineStore('trips', {
    state: () => ({
        baseURL: 'http://localhost:8000/api', // backend url
        initialTrips: [
            {
                id: 1,
                title: 'Viaggio in Turchia',
                img: 'https://www.gitanviaggi.it/wp-content/uploads/2023/06/Viaggio-in-Turchia-consigli-e-cosa-vedere.jpg',
                from: '2 ago',
                to: '9 ago',
                year: 2024,
            },
            {
                id: 2,
                title: 'Viaggio a Parigi',
                img: 'https://media.cdn.facile.it/traveleasy/contenuti/254/1-600.jpg',
                from: '15 set',
                to: '22 set',
                year: 2023,
            },
            {
                id: 3,
                title: 'Viaggio in Madagascar',
                img: 'https://media.istockphoto.com/id/468053398/it/foto/boabab-alley-tramonto.jpg?s=612x612&w=0&k=20&c=uFu8GQF8mS5jx3AScLjNJ1ZQ9RBcwnq_Y9y0fG1ehhI=',
                from: '24 nov',
                to: '28 nov',
                year: 2021,
            },
        ],
        trips: [],
    }),
    actions: {
        async getTrips() {
            try {
                const response = await axios.get(`${this.baseURL}/trips`);
                this.trips = response.data;
                console.log('Viaggi:', this.trips);
            } catch (error) {
                console.error('Errore nel recupero dei viaggi:', error);
            }
        },
        async createTrip(newTrip) {
            try {
                const response = await axios.post(`${this.baseURL}/trips`, newTrip);
                if (response.success === true) {
                    console.log('Viaggio creato:', response);
                    this.trips.push(response.data);
                }
            } catch (error) {
                console.error('Errore nella creazione del viaggio:', error);
            }
        }
    }
});