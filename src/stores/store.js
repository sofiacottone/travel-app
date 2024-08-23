import { defineStore } from 'pinia';
import axios from 'axios';

export const useTripsStore = defineStore('trips', {
    state: () => ({
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
        ]
    }),
    actions: {}
});