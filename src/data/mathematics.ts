import { LearningModule } from '@/types/learning';
import { linearAlgebraModule } from './mathematics/linear-algebra';
import { calculusModule } from './mathematics/calculus';
import { probabilityStatsModule } from './mathematics/probability-stats';
import { linearModelsModule } from './mathematics/linear-models';

export const mathematicsModules: LearningModule[] = [
    linearAlgebraModule,
    calculusModule,
    probabilityStatsModule,
    linearModelsModule
];