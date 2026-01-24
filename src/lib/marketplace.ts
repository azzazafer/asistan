import { supabase } from './db';

export interface Clinic {
    id: string;
    name: string;
    specialty: string[];
    rating: number;
    location: string;
    startingPrice: number;
    verified: boolean;
}

/**
 * Aura Global Marketplace Service
 * Allows patients to discover clinics and treatments across the network.
 */
export class MarketplaceService {

    /**
     * Search for clinics based on treatment and location
     */
    static async searchClinics(treatment: string, location?: string): Promise<Clinic[]> {
        if (!supabase) return this.getMockClinics(treatment);

        let query = supabase
            .from('clinics')
            .select('*')
            .contains('specialty', [treatment]);

        if (location) {
            query = query.ilike('location', `%${location}%`);
        }

        const { data, error } = await query.order('rating', { ascending: false });

        if (error || !data) return this.getMockClinics(treatment);

        return data.map((d: any) => ({
            id: d.id,
            name: d.name,
            specialty: d.specialty,
            rating: d.rating,
            location: d.location,
            startingPrice: d.starting_price,
            verified: d.verified
        }));
    }

    /**
     * Fallback mock data for the Marketplace discovery
     */
    private static getMockClinics(treatment: string): Clinic[] {
        return [
            {
                id: 'clinic_ist_01',
                name: 'Aura Istanbul Elite',
                specialty: ['Hair Transplant', 'Dental'],
                rating: 4.9,
                location: 'Istanbul, Turkey',
                startingPrice: 2000,
                verified: true
            },
            {
                id: 'clinic_ant_02',
                name: 'Aura Antalya Riviera',
                specialty: ['Aesthetics', 'Dental'],
                rating: 4.8,
                location: 'Antalya, Turkey',
                startingPrice: 1500,
                verified: true
            }
        ];
    }
}
