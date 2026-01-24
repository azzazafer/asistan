/**
 * Aura Universal API Bridge v3.0
 * Standardized connector for legacy medical CRM systems.
 */

import { Lead } from '../types';

export interface ExternalLeadPayload {
    id: string;
    patient_name?: string;
    tel?: string;
    interest?: string;
    created_date?: string;
    raw_status?: string;
}

export abstract class AuraConnector {
    abstract name: string;
    abstract fetchLeads(): Promise<Lead[]>;
    abstract pushUpdate(leadId: string, status: string): Promise<boolean>;
}

export class LegacyCRMConnector extends AuraConnector {
    name = "LegacyCRM_Standard";

    /**
     * Transformation Layer: Maps heterogenous legacy data to Aura Lead format.
     */
    transform(payload: ExternalLeadPayload): Lead {
        return {
            name: payload.patient_name || 'Bilinmeyen Hasta',
            phone: payload.tel || '000',
            treatment: payload.interest || 'Genel',
            status: 'Beklemede',
            source: `Legacy_${this.name}`,
            channel: 'Web',
            date: payload.created_date || new Date().toISOString(),
            tenant_id: 'default_clinic' // Standardized link
        };
    }

    async fetchLeads(): Promise<Lead[]> {
        // Simulated REST call to legacy system
        console.log(`[Bridge] Fetching leads from ${this.name}...`);

        const mockRawData: ExternalLeadPayload[] = [
            { id: 'ext_001', patient_name: 'Ahmet Legacy', tel: '+905550001', interest: 'Dental' },
            { id: 'ext_002', patient_name: 'Hans Legacy', tel: '+491760002', interest: 'Hair' }
        ];

        return mockRawData.map(p => this.transform(p));
    }

    async pushUpdate(leadId: string, status: string): Promise<boolean> {
        console.log(`[Bridge] Pushing status update '${status}' for ${leadId} to ${this.name}`);
        return true;
    }
}

export class BridgeOrchestrator {
    private static connectors: AuraConnector[] = [];

    static register(connector: AuraConnector) {
        this.connectors.push(connector);
    }

    static async syncAll(): Promise<Lead[]> {
        let allLeads: Lead[] = [];
        for (const conn of this.connectors) {
            const leads = await conn.fetchLeads();
            allLeads = [...allLeads, ...leads];
        }
        return allLeads;
    }
}
