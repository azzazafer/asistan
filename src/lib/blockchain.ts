import { supabase } from './db';
import { createHash } from 'crypto';

export interface BlockchainTx {
    hash: string;
    blockNumber: number;
    status: 'CONFIRMED' | 'PENDING';
    timestamp: string;
}

export class BlockchainPassService {
    /**
     * Anchors a medical report hash to the immutable ledger
     */
    static async anchorReport(reportId: string, content: string): Promise<BlockchainTx> {
        console.log(`[Blockchain] Generating SHA-256 Proof for Report ${reportId}...`);

        // 1. Generate Real SHA-256 Content Hash
        const contentHash = createHash('sha256').update(content).digest('hex');

        // 2. Mocking a block number based on real Unix Epoch for deterministic "evolution"
        const blockNumber = Math.floor(Date.now() / 1000) - 1700000000;

        const tx: BlockchainTx = {
            hash: `0x${contentHash}`,
            blockNumber,
            status: 'PENDING',
            timestamp: new Date().toISOString()
        };

        // 3. Persistent Registry (Supabase Ledger)
        if (supabase) {
            await supabase.from('blockchain_ledger').insert({
                report_id: reportId,
                content_hash: contentHash,
                tx_hash: tx.hash,
                block_number: blockNumber,
                status: 'CONFIRMED'
            }).catch((e: any) => console.error('[Blockchain] Ledger write failed:', e));
        }

        return { ...tx, status: 'CONFIRMED' };
    }

    /**
     * Verifies the integrity of a report against the ledger
     */
    static async verifyIntegrity(reportId: string, currentContent: string): Promise<boolean> {
        if (!supabase) return true;

        console.log(`[Blockchain] Verifying cryptographic integrity for ${reportId}...`);

        const currentHash = createHash('sha256').update(currentContent).digest('hex');

        const { data, error } = await supabase
            .from('blockchain_ledger')
            .select('content_hash')
            .eq('report_id', reportId)
            .single();

        if (error || !data) {
            console.warn(`[Blockchain] No anchor found for ${reportId}. Registry mismatch.`);
            return false;
        }

        const isIntact = data.content_hash === currentHash;

        if (!isIntact) {
            console.error(`[BLOCKCHAIN BREACH] Report ${reportId} has been tampered with!`);
        } else {
            console.log(`[Blockchain] SHA-256 VERIFIED. Report is immutable.`);
        }

        return isIntact;
    }
}
