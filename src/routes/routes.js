import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Starter from '../components/GeneralViews/Starter.vue'

// Admin pages

//User Pages
import User from 'src/components/Dashboard/Views/Users/User.vue'
import UserList from 'src/components/Dashboard/Views/Users/UserList.vue'
import UserCharts from 'src/components/Dashboard/Views/Users/UserCharts.vue'
import UserEdit from 'src/components/Dashboard/Views/Users/UserEdit.vue'
import UserCreate from 'src/components/Dashboard/Views/Users/UserCreate.vue'

//Payment Page
import Payment from 'src/components/Dashboard/Views/Payment/Payment.vue'
import PaymentList from 'src/components/Dashboard/Views/Payment/PaymentList.vue'
import PaymentEdit from 'src/components/Dashboard/Views/Payment/PaymentEdit.vue'
import PaymentCreate from 'src/components/Dashboard/Views/Payment/PaymentCreate.vue'


//Supports Page
import Support from 'src/components/Dashboard/Views/Support/Support.vue'
import SupportList from 'src/components/Dashboard/Views/Support/SupportList.vue'
import SupportEdit from 'src/components/Dashboard/Views/Support/SupportEdit.vue'
import SupportCreate from 'src/components/Dashboard/Views/Support/SupportCreate.vue'

//Notifications Page
import Notifications from 'src/components/Dashboard/Views/Notifications/Notifications.vue'; 
import NotificationList from 'src/components/Dashboard/Views/Notifications/NotificationList.vue'; 
import NotificationCreate from 'src/components/Dashboard/Views/Notifications/NotificationCreate.vue'; 
import NotificationEdit from 'src/components/Dashboard/Views/Notifications/NotificationEdit.vue'; 

//Areas Page
import Area from 'src/components/Dashboard/Views/Area/Area.vue'; 
import AreaList from 'src/components/Dashboard/Views/Area/AreaList.vue'; 
import AreaCreate from 'src/components/Dashboard/Views/Area/AreaCreate.vue'; 
import AreaEdit from 'src/components/Dashboard/Views/Area/AreaEdit.vue'; 

//Subject Page
import Subject from 'src/components/Dashboard/Views/Subject/Subject.vue'; 
import SubjectList from 'src/components/Dashboard/Views/Subject/SubjectList.vue'; 
import SubjectCreate from 'src/components/Dashboard/Views/Subject/SubjectCreate.vue'; 
import SubjectEdit from 'src/components/Dashboard/Views/Subject/SubjectEdit.vue'; 

//Schedule Page
import Schedule from 'src/components/Dashboard/Views/Schedule/Schedule.vue'; 
import ScheduleList from 'src/components/Dashboard/Views/Schedule/ScheduleList.vue'; 
import ScheduleCreate from 'src/components/Dashboard/Views/Schedule/ScheduleCreate.vue'; 
import ScheduleEdit from 'src/components/Dashboard/Views/Schedule/ScheduleEdit.vue'; 

//Sex Page
import Sex from 'src/components/Dashboard/Views/Sex/Sex.vue'; 
import SexList from 'src/components/Dashboard/Views/Sex/SexList.vue'; 
import SexCreate from 'src/components/Dashboard/Views/Sex/SexCreate.vue'; 
import SexEdit from 'src/components/Dashboard/Views/Sex/SexEdit.vue'; 

//CivilState Page
import CivilState from 'src/components/Dashboard/Views/CivilState/CivilState.vue'; 
import CivilStateList from 'src/components/Dashboard/Views/CivilState/CivilStateList.vue'; 
import CivilStateCreate from 'src/components/Dashboard/Views/CivilState/CivilStateCreate.vue'; 
import CivilStateEdit from 'src/components/Dashboard/Views/CivilState/CivilStateEdit.vue'; 

//Nationality Page
import Nationality from 'src/components/Dashboard/Views/Nationality/Nationality.vue'; 
import NationalityList from 'src/components/Dashboard/Views/Nationality/NationalityList.vue'; 
import NationalityCreate from 'src/components/Dashboard/Views/Nationality/NationalityCreate.vue'; 
import NationalityEdit from 'src/components/Dashboard/Views/Nationality/NationalityEdit.vue'; 

//News Page
import News from 'src/components/Dashboard/Views/News/News.vue'; 
import NewsList from 'src/components/Dashboard/Views/News/NewsList.vue'; 
import NewsCreate from 'src/components/Dashboard/Views/News/NewsCreate.vue'; 
import NewsEdit from 'src/components/Dashboard/Views/News/NewsEdit.vue'; 

//Organ Page
import Organ from 'src/components/Dashboard/Views/Organ/Organ.vue'; 
import OrganList from 'src/components/Dashboard/Views/Organ/OrganList.vue'; 
import OrganCreate from 'src/components/Dashboard/Views/Organ/OrganCreate.vue'; 
import OrganEdit from 'src/components/Dashboard/Views/Organ/OrganEdit.vue'; 

//CommonQuestion Page
import CommonQuestion from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestion.vue'; 
import CommonQuestionList from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionList.vue'; 
import CommonQuestionCreate from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionCreate.vue'; 
import CommonQuestionEdit from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionEdit.vue'; 

//Complaint Page
import Complaint from 'src/components/Dashboard/Views/Complaint/Complaint.vue'; 
import ComplaintList from 'src/components/Dashboard/Views/Complaint/ComplaintList.vue'; 
import ComplaintCreate from 'src/components/Dashboard/Views/Complaint/ComplaintCreate.vue'; 
import ComplaintEdit from 'src/components/Dashboard/Views/Complaint/ComplaintEdit.vue'; 

//Promotion Page
import Promotion from 'src/components/Dashboard/Views/Promotion/Promotion.vue'; 
import PromotionList from 'src/components/Dashboard/Views/Promotion/PromotionList.vue'; 
import PromotionCreate from 'src/components/Dashboard/Views/Promotion/PromotionCreate.vue'; 
import PromotionEdit from 'src/components/Dashboard/Views/Promotion/PromotionEdit.vue';

//Settings Page
import Settings from 'src/components/Dashboard/Views/Settings/Settings.vue';
import SettingsEdit from 'src/components/Dashboard/Views/Settings/SettingsEdit.vue';

//Tools Page
import Tools from 'src/components/Dashboard/Views/Tools/Tools.vue';
import ToolsList from 'src/components/Dashboard/Views/Tools/ToolsList.vue';

//Password Page
import Password from 'src/components/Dashboard/Views/Password/Password.vue';
import PasswordEdit from 'src/components/Dashboard/Views/Password/PasswordEdit.vue';

import Home from 'src/components/Dashboard/Views/Home.vue'    
import { Store } from 'vuex';



const routes = [
  {
    path: '/',
    component: Starter,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      // {
      //   path: 'ferramentas',
      //   name: 'Ferramentas',
      //   component: Tools,
      //   redirect: 'ferramentas/lista',
      //   children: [
      //     {
      //       path: 'lista',
      //       name: 'Ferramentas - Lista',
      //       component: ToolsList
      //     },]

      // },
      {
        path: 'usuarios',
        name: 'Usuários',
        component: User,
        redirect: 'usuarios/lista',
        children: [
          {
            path: 'lista',
            name: 'Usuários - Lista',
            component: UserList
          },
          {
            path: 'grafico',
            name: 'Usuários - Gráfico',
            component: UserCharts
          },
          {
            path: 'editar/',
            name: 'Usuários - Editar',
            component: UserEdit
          },
          {
            path: 'criar',
            name: 'Usuários - Criar',
            component: UserCreate
          },

        ]
      },      
      {
        path: 'pagamentos',
        name: 'Pagamentos',
        component: Payment,
        redirect: 'pagamentos/lista',
        children: [
          {
            path: 'lista',
            name: 'Pagamentos - Lista',
            component: PaymentList
          },
          {
            path: 'editar/',
            name: 'Pagamentos - Editar',
            component: PaymentEdit
          },
          {
            path: 'criar',
            name: 'Pagamentos - Criar',
            component: PaymentCreate
          },

        ]
      },
      {
        path: 'suportes',
        name: 'Suportes',
        component: Support,
        redirect: 'upgrades/lista',
        children: [
          {
            path: 'lista',
            name: 'Suportes - Lista',
            component: SupportList
          },
          {
            path: 'editar/',
            name: 'Suportes - Editar',
            component: SupportEdit
          },
          {
            path: 'criar',
            name: 'Suportes - Criar',
            component: SupportCreate
          },

        ]
      },
      {
        path: 'notificacoes',
        name: 'Notificações',
        component: Notifications,
        redirect: 'notificacoes/lista',
        children: [
          {
            path: 'lista',
            name: 'Notificações - Lista',
            component: NotificationList
          },
          {
            path: 'criar',
            name: 'Notificações - Criar',
            component: NotificationCreate
          },
          {
            path: 'editar/:id',
            name: 'Notificações - Editar',
            component: NotificationEdit
          },
      ]
      },
      {
        path: 'agendamentos',
        name: 'Agendamento',
        component: Schedule,
        redirect: 'agendamentos/lista',
        children: [
          {
            path: 'lista',
            name: 'Agendamento - Lista',
            component: ScheduleList
          },
          {
            path: 'criar',
            name: 'Agendamento - Criar',
            component: ScheduleCreate
          },
          {
            path: 'editar',
            name: 'Agendamento - Editar',
            component: ScheduleEdit
          },
      ]
      },
      {
        path: 'assuntos',
        name: 'Assunto',
        component: Subject,
        redirect: 'assuntos/lista',
        children: [
          {
            path: 'lista',
            name: 'Assunto - Lista',
            component: SubjectList
          },
          {
            path: 'criar',
            name: 'Assunto - Criar',
            component: SubjectCreate
          },
          {
            path: 'editar',
            name: 'Assunto - Editar',
            component: SubjectEdit
          },
      ]
      },
      {
        path: 'areas',
        name: 'Área',
        component: Area,
        redirect: 'areas/lista',
        children: [
          {
            path: 'lista',
            name: 'Área - Lista',
            component: AreaList
          },
          {
            path: 'criar',
            name: 'Área - Criar',
            component: AreaCreate
          },
          {
            path: 'editar',
            name: 'Área - Editar',
            component: AreaEdit
          },
      ]
      },
      {
        path: 'sexo',
        name: 'Sexo',
        component: Sex,
        redirect: 'sexo/lista',
        children: [
          {
            path: 'lista',
            name: 'Sexo - Lista',
            component: SexList
          },
          {
            path: 'criar',
            name: 'Sexo - Criar',
            component: SexCreate
          },
          {
            path: 'editar',
            name: 'Sexo - Editar',
            component: SexEdit
          },
      ]
      },
      {
        path: 'estadocivil',
        name: 'Estado Civil',
        component: CivilState,
        redirect: 'estadocivil/lista',
        children: [
          {
            path: 'lista',
            name: 'Estado Civil - Lista',
            component: CivilStateList
          },
          {
            path: 'criar',
            name: 'Estado Civil - Criar',
            component: CivilStateCreate
          },
          {
            path: 'editar',
            name: 'Estado Civil - Editar',
            component: CivilStateEdit
          },
      ]
      },
      {
        path: 'nacionalidade',
        name: 'Nacionalidade',
        component: Nationality,
        redirect: 'nacionalidade/lista',
        children: [
          {
            path: 'lista',
            name: 'Nacionalidade - Lista',
            component: NationalityList
          },
          {
            path: 'criar',
            name: 'Nacionalidade - Criar',
            component: NationalityCreate
          },
          {
            path: 'editar',
            name: 'Nacionalidade - Editar',
            component: NationalityEdit
          },
      ]
      },
      {
        path: 'noticias',
        name: 'Notícia',
        component: News,
        redirect: 'noticias/lista',
        children: [
          {
            path: 'lista',
            name: 'Notícia - Lista',
            component: NewsList
          },
          {
            path: 'criar',
            name: 'Notícia - Criar',
            component: NewsCreate
          },
          {
            path: 'editar',
            name: 'Notícia - Editar',
            component: NewsEdit
          },
      ]
      },
      {
        path: 'orgaos',
        name: 'Orgão',
        component: Organ,
        redirect: 'orgaos/lista',
        children: [
          {
            path: 'lista',
            name: 'Orgão - Lista',
            component: OrganList
          },
          {
            path: 'criar',
            name: 'Orgão - Criar',
            component: OrganCreate
          },
          {
            path: 'editar',
            name: 'Orgão - Editar',
            component: OrganEdit
          },
      ]
      },
      {
        path: 'perguntas',
        name: 'Pergunta Frequente',
        component: CommonQuestion,
        redirect: 'perguntas/lista',
        children: [
          {
            path: 'lista',
            name: 'Pergunta Frequente - Lista',
            component: CommonQuestionList
          },
          {
            path: 'criar',
            name: 'Pergunta Frequente - Criar',
            component: CommonQuestionCreate
          },
          {
            path: 'editar',
            name: 'Pergunta Frequente - Editar',
            component: CommonQuestionEdit
          },
      ]
      },
      {
        path: 'promocoes',
        name: 'Promoção',
        component: Promotion,
        redirect: 'promocoes/lista',
        children: [
          {
            path: 'lista',
            name: 'Promoção - Lista',
            component: PromotionList
          },
          {
            path: 'criar',
            name: 'Promoção - Criar',
            component: PromotionCreate
          },
          {
            path: 'editar',
            name: 'Promoção - Editar',
            component: PromotionEdit
          },
      ]
      },
      {
        path: 'denuncias',
        name: 'Denúncia',
        component: Complaint,
        redirect: 'perguntas/lista',
        children: [
          {
            path: 'lista',
            name: 'Denúncia - Lista',
            component: ComplaintList
          },
          {
            path: 'criar',
            name: 'Denúncia - Criar',
            component: ComplaintCreate
          },
          {
            path: 'editar',
            name: 'Denúncia - Editar',
            component: ComplaintEdit
          },
      ]
      },
      {
        path: 'configuracoes',
        name: 'Configurações',
        component: Settings,
        redirect: 'configuracoes/editar',
        children: [
          {
            path: 'editar',
            name: 'Configurações',
            component: SettingsEdit
          },
        ]
      },
{
  path: 'senha',
  name: 'Senha',
  component: Password,
  redirect: 'senha/editar',
  children: [
    {
      path: 'editar',
      name: 'Trocar Senha',
      component: PasswordEdit
    },
  ]
},
    ]
  },
  {path: '*', component: NotFound}
];

export default routes
