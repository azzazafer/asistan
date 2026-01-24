/**
 * Aura Telemedicine - Video Consultation Module
 * WebRTC-based video calls for remote medical consultations
 */

// ============================================
// TYPES
// ============================================
export interface VideoSession {
    id: string;
    doctorId: string;
    patientId: string;
    appointmentId?: string;
    status: 'waiting' | 'connecting' | 'active' | 'ended' | 'failed';
    startTime?: string;
    endTime?: string;
    duration?: number; // seconds
    recording?: string; // URL to recording
    notes?: string;
    createdAt: string;
}

export interface Participant {
    id: string;
    name: string;
    role: 'doctor' | 'patient' | 'translator' | 'observer';
    audioEnabled: boolean;
    videoEnabled: boolean;
    joinedAt?: string;
}

export interface SessionConfig {
    enableRecording: boolean;
    enableChat: boolean;
    enableScreenShare: boolean;
    maxParticipants: number;
    autoEndMinutes: number;
}

// ============================================
// SESSION STORAGE (Replace with real DB)
// ============================================
const sessions: VideoSession[] = [];
const participants: Map<string, Participant[]> = new Map();

// ============================================
// DEFAULT CONFIG
// ============================================
const DEFAULT_CONFIG: SessionConfig = {
    enableRecording: true,
    enableChat: true,
    enableScreenShare: true,
    maxParticipants: 4,
    autoEndMinutes: 60,
};

// ============================================
// SESSION MANAGEMENT
// ============================================
export const createVideoSession = (
    doctorId: string,
    patientId: string,
    appointmentId?: string,
    config: Partial<SessionConfig> = {}
): VideoSession => {
    const sessionId = `vs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const session: VideoSession = {
        id: sessionId,
        doctorId,
        patientId,
        appointmentId,
        status: 'waiting',
        createdAt: new Date().toISOString(),
    };

    sessions.push(session);
    participants.set(sessionId, []);

    console.log(`[Telemedicine] Created session: ${sessionId}`);

    return session;
};

export const joinSession = (
    sessionId: string,
    participantId: string,
    name: string,
    role: Participant['role']
): { success: boolean; token?: string; error?: string } => {
    const session = sessions.find(s => s.id === sessionId);

    if (!session) {
        return { success: false, error: 'Session not found' };
    }

    if (session.status === 'ended' || session.status === 'failed') {
        return { success: false, error: 'Session has ended' };
    }

    const sessionParticipants = participants.get(sessionId) || [];

    if (sessionParticipants.length >= DEFAULT_CONFIG.maxParticipants) {
        return { success: false, error: 'Session is full' };
    }

    const participant: Participant = {
        id: participantId,
        name,
        role,
        audioEnabled: true,
        videoEnabled: true,
        joinedAt: new Date().toISOString(),
    };

    sessionParticipants.push(participant);
    participants.set(sessionId, sessionParticipants);

    // Update session status
    if (session.status === 'waiting') {
        session.status = 'connecting';
    }

    // If both doctor and patient joined, mark as active
    const hasDoctor = sessionParticipants.some(p => p.role === 'doctor');
    const hasPatient = sessionParticipants.some(p => p.role === 'patient');

    if (hasDoctor && hasPatient && session.status === 'connecting') {
        session.status = 'active';
        session.startTime = new Date().toISOString();
    }

    // Generate a mock token (in production, use Twilio/Agora/Daily.co)
    const token = `token_${sessionId}_${participantId}_${Date.now()}`;

    console.log(`[Telemedicine] ${name} (${role}) joined session ${sessionId}`);

    return { success: true, token };
};

export const leaveSession = (sessionId: string, participantId: string): boolean => {
    const sessionParticipants = participants.get(sessionId);

    if (!sessionParticipants) return false;

    const index = sessionParticipants.findIndex(p => p.id === participantId);

    if (index === -1) return false;

    const [removed] = sessionParticipants.splice(index, 1);
    participants.set(sessionId, sessionParticipants);

    console.log(`[Telemedicine] ${removed.name} left session ${sessionId}`);

    // If no participants left, end session
    if (sessionParticipants.length === 0) {
        endSession(sessionId, 'All participants left');
    }

    return true;
};

export const endSession = (sessionId: string, reason?: string): VideoSession | null => {
    const session = sessions.find(s => s.id === sessionId);

    if (!session) return null;

    session.status = 'ended';
    session.endTime = new Date().toISOString();

    if (session.startTime) {
        const start = new Date(session.startTime).getTime();
        const end = new Date(session.endTime).getTime();
        session.duration = Math.round((end - start) / 1000);
    }

    if (reason) {
        session.notes = reason;
    }

    console.log(`[Telemedicine] Session ${sessionId} ended. Duration: ${session.duration}s`);

    return session;
};

// ============================================
// MEDIA CONTROLS
// ============================================
export const toggleAudio = (sessionId: string, participantId: string): boolean => {
    const sessionParticipants = participants.get(sessionId);
    const participant = sessionParticipants?.find(p => p.id === participantId);

    if (!participant) return false;

    participant.audioEnabled = !participant.audioEnabled;
    console.log(`[Telemedicine] ${participant.name} audio: ${participant.audioEnabled}`);

    return participant.audioEnabled;
};

export const toggleVideo = (sessionId: string, participantId: string): boolean => {
    const sessionParticipants = participants.get(sessionId);
    const participant = sessionParticipants?.find(p => p.id === participantId);

    if (!participant) return false;

    participant.videoEnabled = !participant.videoEnabled;
    console.log(`[Telemedicine] ${participant.name} video: ${participant.videoEnabled}`);

    return participant.videoEnabled;
};

// ============================================
// SCREEN SHARING
// ============================================
export const startScreenShare = (sessionId: string, participantId: string): { success: boolean; error?: string } => {
    const session = sessions.find(s => s.id === sessionId);

    if (!session || session.status !== 'active') {
        return { success: false, error: 'Session not active' };
    }

    console.log(`[Telemedicine] Screen share started in session ${sessionId}`);

    return { success: true };
};

export const stopScreenShare = (sessionId: string): boolean => {
    console.log(`[Telemedicine] Screen share stopped in session ${sessionId}`);
    return true;
};

// ============================================
// RECORDING
// ============================================
export const startRecording = (sessionId: string): { success: boolean; recordingId?: string; error?: string } => {
    const session = sessions.find(s => s.id === sessionId);

    if (!session || session.status !== 'active') {
        return { success: false, error: 'Session not active' };
    }

    const recordingId = `rec_${sessionId}_${Date.now()}`;

    console.log(`[Telemedicine] Recording started: ${recordingId}`);

    return { success: true, recordingId };
};

export const stopRecording = (sessionId: string): { success: boolean; url?: string } => {
    const session = sessions.find(s => s.id === sessionId);

    if (!session) {
        return { success: false };
    }

    // Simulated recording URL
    session.recording = `/recordings/${sessionId}.webm`;

    console.log(`[Telemedicine] Recording saved: ${session.recording}`);

    return { success: true, url: session.recording };
};

// ============================================
// SESSION QUERIES
// ============================================
export const getSession = (sessionId: string): VideoSession | null => {
    return sessions.find(s => s.id === sessionId) || null;
};

export const getSessionParticipants = (sessionId: string): Participant[] => {
    return participants.get(sessionId) || [];
};

export const getDoctorSessions = (doctorId: string): VideoSession[] => {
    return sessions.filter(s => s.doctorId === doctorId);
};

export const getPatientSessions = (patientId: string): VideoSession[] => {
    return sessions.filter(s => s.patientId === patientId);
};

export const getActiveSessions = (): VideoSession[] => {
    return sessions.filter(s => s.status === 'active' || s.status === 'connecting');
};

// ============================================
// WAITING ROOM
// ============================================
export interface WaitingRoomStatus {
    position: number;
    estimatedWaitMinutes: number;
    sessionId: string;
}

export const getWaitingRoomStatus = (patientId: string): WaitingRoomStatus | null => {
    const waitingSessions = sessions.filter(s =>
        s.patientId === patientId && s.status === 'waiting'
    );

    if (waitingSessions.length === 0) return null;

    const session = waitingSessions[0];
    const allWaiting = sessions.filter(s => s.status === 'waiting');
    const position = allWaiting.findIndex(s => s.id === session.id) + 1;

    return {
        position,
        estimatedWaitMinutes: position * 15, // 15 min per patient estimate
        sessionId: session.id,
    };
};

// ============================================
// CHAT (In-session messaging)
// ============================================
export interface ChatMessage {
    id: string;
    sessionId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
}

const chatMessages: Map<string, ChatMessage[]> = new Map();

export const sendChatMessage = (
    sessionId: string,
    senderId: string,
    senderName: string,
    content: string
): ChatMessage => {
    const message: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId,
        senderId,
        senderName,
        content,
        timestamp: new Date().toISOString(),
    };

    const messages = chatMessages.get(sessionId) || [];
    messages.push(message);
    chatMessages.set(sessionId, messages);

    console.log(`[Telemedicine Chat] ${senderName}: ${content.substring(0, 50)}...`);

    return message;
};

export const getChatHistory = (sessionId: string): ChatMessage[] => {
    return chatMessages.get(sessionId) || [];
};
