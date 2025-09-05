export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agroindustrias: {
        Row: {
          cnpj: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          licencas: string[] | null
          nome: string
          produtos: string[] | null
          responsavel: string | null
          status: string | null
          telefone: string | null
          tipo_industria: string | null
          updated_at: string | null
        }
        Insert: {
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          licencas?: string[] | null
          nome: string
          produtos?: string[] | null
          responsavel?: string | null
          status?: string | null
          telefone?: string | null
          tipo_industria?: string | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          licencas?: string[] | null
          nome?: string
          produtos?: string[] | null
          responsavel?: string | null
          status?: string | null
          telefone?: string | null
          tipo_industria?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      associacoes: {
        Row: {
          cnpj: string | null
          created_at: string | null
          dirigente: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          participa_paa: boolean | null
          participa_pnae: boolean | null
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          cnpj?: string | null
          created_at?: string | null
          dirigente?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          participa_paa?: boolean | null
          participa_pnae?: boolean | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string | null
          created_at?: string | null
          dirigente?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          participa_paa?: boolean | null
          participa_pnae?: boolean | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      atendimentos_ater: {
        Row: {
          created_at: string | null
          culturas: string[] | null
          data_visita: string
          documentos: string[] | null
          fotos: string[] | null
          id: string
          latitude: number | null
          longitude: number | null
          observacoes: string | null
          produtor_id: string
          recomendacoes: string | null
          status: string | null
          tecnico_id: string | null
          tipo_atendimento: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          culturas?: string[] | null
          data_visita: string
          documentos?: string[] | null
          fotos?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          observacoes?: string | null
          produtor_id: string
          recomendacoes?: string | null
          status?: string | null
          tecnico_id?: string | null
          tipo_atendimento?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          culturas?: string[] | null
          data_visita?: string
          documentos?: string[] | null
          fotos?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          observacoes?: string | null
          produtor_id?: string
          recomendacoes?: string | null
          status?: string | null
          tecnico_id?: string | null
          tipo_atendimento?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_ater_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      credito_rural: {
        Row: {
          banco: string
          created_at: string | null
          data_encaminhamento: string | null
          data_solicitacao: string | null
          documentos_anexos: string[] | null
          finalidade: string | null
          id: string
          linha_credito: string
          observacoes: string | null
          produtor_id: string
          responsavel_id: string | null
          status: string | null
          updated_at: string | null
          valor_solicitado: number | null
        }
        Insert: {
          banco: string
          created_at?: string | null
          data_encaminhamento?: string | null
          data_solicitacao?: string | null
          documentos_anexos?: string[] | null
          finalidade?: string | null
          id?: string
          linha_credito: string
          observacoes?: string | null
          produtor_id: string
          responsavel_id?: string | null
          status?: string | null
          updated_at?: string | null
          valor_solicitado?: number | null
        }
        Update: {
          banco?: string
          created_at?: string | null
          data_encaminhamento?: string | null
          data_solicitacao?: string | null
          documentos_anexos?: string[] | null
          finalidade?: string | null
          id?: string
          linha_credito?: string
          observacoes?: string | null
          produtor_id?: string
          responsavel_id?: string | null
          status?: string | null
          updated_at?: string | null
          valor_solicitado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "credito_rural_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos: {
        Row: {
          autoridades_convidadas: string[] | null
          created_at: string | null
          custo_estimado: number | null
          data_fim: string | null
          data_inicio: string
          descricao: string | null
          id: string
          local: string | null
          participantes_confirmados: number | null
          participantes_esperados: number | null
          responsavel_id: string | null
          status: string | null
          tipo: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          autoridades_convidadas?: string[] | null
          created_at?: string | null
          custo_estimado?: number | null
          data_fim?: string | null
          data_inicio: string
          descricao?: string | null
          id?: string
          local?: string | null
          participantes_confirmados?: number | null
          participantes_esperados?: number | null
          responsavel_id?: string | null
          status?: string | null
          tipo?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          autoridades_convidadas?: string[] | null
          created_at?: string | null
          custo_estimado?: number | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          id?: string
          local?: string | null
          participantes_confirmados?: number | null
          participantes_esperados?: number | null
          responsavel_id?: string | null
          status?: string | null
          tipo?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      produtores: {
        Row: {
          aldeia: string | null
          associacao_id: string | null
          caf_numero: string | null
          caf_validade: string | null
          comunidade: string | null
          cpf: string
          created_at: string | null
          created_by: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          rg: string | null
          status: string | null
          telefone: string | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          aldeia?: string | null
          associacao_id?: string | null
          caf_numero?: string | null
          caf_validade?: string | null
          comunidade?: string | null
          cpf: string
          created_at?: string | null
          created_by?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          rg?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          aldeia?: string | null
          associacao_id?: string | null
          caf_numero?: string | null
          caf_validade?: string | null
          comunidade?: string | null
          cpf?: string
          created_at?: string | null
          created_by?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          rg?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_produtores_associacao"
            columns: ["associacao_id"]
            isOneToOne: false
            referencedRelation: "associacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean | null
          cargo: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          id: string
          nome: string
          papel: string
          telefone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ativo?: boolean | null
          cargo?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome: string
          papel: string
          telefone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ativo?: boolean | null
          cargo?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string
          papel?: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      propriedades: {
        Row: {
          area_hectares: number | null
          created_at: string | null
          id: string
          latitude: number | null
          licencas: string[] | null
          longitude: number | null
          nome: string
          observacoes: string | null
          produtor_id: string
          sistema_irrigacao: boolean | null
          updated_at: string | null
          uso_solo: string[] | null
          vicinal: string | null
          vila: string | null
        }
        Insert: {
          area_hectares?: number | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          licencas?: string[] | null
          longitude?: number | null
          nome: string
          observacoes?: string | null
          produtor_id: string
          sistema_irrigacao?: boolean | null
          updated_at?: string | null
          uso_solo?: string[] | null
          vicinal?: string | null
          vila?: string | null
        }
        Update: {
          area_hectares?: number | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          licencas?: string[] | null
          longitude?: number | null
          nome?: string
          observacoes?: string | null
          produtor_id?: string
          sistema_irrigacao?: boolean | null
          updated_at?: string | null
          uso_solo?: string[] | null
          vicinal?: string | null
          vila?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "propriedades_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
