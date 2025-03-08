import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TransactionType } from './enums/TransactionType';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ 
        type: 'enum', 
        enum: TransactionType,
        enumName: 'transaction_type'
    })
    type: TransactionType;

    @CreateDateColumn()
    timestamp: Date;
} 